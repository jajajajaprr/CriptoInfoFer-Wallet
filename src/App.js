import React, { useState, useEffect } from 'react';
import CriptoNovaHeader from './components/CriptoNovaHeader';
import CriptoNovaMarketTable from './components/CriptoNovaMarketTable';
import CriptoNovaNavigation from './components/CriptoNovaNavigation';
import CriptoNovaLogin from './components/CriptoNovaLogin';
import CriptoNovaFavoritesList from './components/CriptoNovaFavoritesList';
import CriptoNovaPortfolio from './components/CriptoNovaPortfolio';
import CriptoNovaTrade from './components/CriptoNovaTrade';
import CriptoNovaProfile from './components/CriptoNovaProfile';
import CriptoNovaRegister from './components/CriptoNovaRegister';
import CriptoNovaDashboard from './components/CriptoNovaDashboard';
import CriptoNovaTransactionHistory from './components/CriptoNovaTransactionHistory';
import CriptoNovaDepositWithdraw from './components/CriptoNovaDepositWithdraw';
import CriptoNovaPaymentGateway from './components/CriptoNovaPaymentGateway';
import CriptoNovaInfo from './components/CriptoNovaInfo'; // Importar el nuevo componente de Info


const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [allCryptoPrices, setAllCryptoPrices] = useState([]);
  const [displayedCryptoPrices, setDisplayedCryptoPrices] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('criptonovaFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [user, setUser] = useState(() => {
    const currentUser = localStorage.getItem('criptonovaCurrentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  });
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);

  const itemsPerPage = 15;

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('criptonovaFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('criptonovaCurrentUser', JSON.stringify(user));
      const users = JSON.parse(localStorage.getItem('criptonovaUsers')) || [];
      const updatedUsers = users.map(u => u.email === user.email ? user : u);
      localStorage.setItem('criptonovaUsers', JSON.stringify(updatedUsers));
    } else {
       localStorage.removeItem('criptonovaCurrentUser');
    }
  }, [user]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
        const data = await response.json();

        const formattedPrices = data.map(item => ({
            symbol: item.symbol,
            price: item.lastPrice,
            change24h: parseFloat(item.priceChangePercent),
            volume: item.quoteVolume,
          }));

        setAllCryptoPrices(formattedPrices);
        setDisplayedCryptoPrices(formattedPrices.slice(0, itemsPerPage));
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      }
    };

    if (isLoggedIn) {
      fetchPrices();
      const intervalId = setInterval(fetchPrices, 10000);
      return () => clearInterval(intervalId);
    }
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    const currentUser = localStorage.getItem('criptonovaCurrentUser');
    setUser(JSON.parse(currentUser));
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleRegisterSuccess = () => {
     const currentUser = localStorage.getItem('criptonovaCurrentUser');
     setUser(JSON.parse(currentUser));
     setIsLoggedIn(true);
     setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('criptonovaCurrentUser');
    setCurrentPage('login');
  };

  const handleToggleFavorite = (symbol) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(symbol)
        ? prevFavorites.filter(fav => fav !== symbol)
        : [...prevFavorites, symbol]
    );
  };

  const handleLoadMore = () => {
    const currentLength = displayedCryptoPrices.length;
    const nextItems = allCryptoPrices.slice(currentLength, currentLength + itemsPerPage);
    setDisplayedCryptoPrices([...displayedCryptoPrices, ...nextItems]);
  };

  const handleTrade = (type, symbol, quantity, price) => {
    if (!user) return;

    const transaction = {
      type,
      symbol: symbol.replace('USDT', ''),
      quantity,
      price,
      timestamp: Date.now(),
    };

    let updatedBalance = user.balance;
    let updatedPortfolio = [...user.portfolio];

    if (type === 'buy') {
      const cost = quantity * price;
      updatedBalance -= cost;

      const existingAssetIndex = updatedPortfolio.findIndex(asset => asset.symbol === transaction.symbol);
      if (existingAssetIndex > -1) {
        updatedPortfolio[existingAssetIndex].quantity += quantity;
      } else {
        updatedPortfolio.push({ symbol: transaction.symbol, quantity });
      }
    } else { // sell
      const revenue = quantity * price;
      updatedBalance += revenue;

      const existingAssetIndex = updatedPortfolio.findIndex(asset => asset.symbol === transaction.symbol);
       if (existingAssetIndex > -1) {
        updatedPortfolio[existingAssetIndex].quantity -= quantity;
        if (updatedPortfolio[existingAssetIndex].quantity <= 0) {
          updatedPortfolio = updatedPortfolio.filter(asset => asset.symbol !== transaction.symbol);
        }
      }
    }

    setUser({
      ...user,
      balance: updatedBalance,
      portfolio: updatedPortfolio,
      transactions: [...user.transactions, transaction],
    });
  };

  const handleDeposit = (amount) => {
     if (!user) return;
     const transaction = {
       type: 'deposit',
       amountUSD: amount,
       timestamp: Date.now(),
     };
     setUser({
       ...user,
       balance: user.balance + amount,
       transactions: [...user.transactions, transaction],
     });
     setShowPaymentGateway(false); // Cerrar pasarela después del depósito
  };

  const handleWithdraw = (amount) => {
     if (!user) return;
      if (amount > user.balance) {
        alert('Saldo insuficiente para retirar.');
        return;
      }
     const transaction = {
       type: 'withdraw',
       amountUSD: amount,
       timestamp: Date.now(),
     };
     setUser({
       ...user,
       balance: user.balance - amount,
       transactions: [...user.transactions, transaction],
     });
  };

  const handleResetData = () => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar todos tus datos? Esto borrará tu saldo, portafolio y transacciones.')) {
      localStorage.removeItem('criptonovaCurrentUser');
      localStorage.removeItem('criptonovaFavorites');
      const users = JSON.parse(localStorage.getItem('criptonovaUsers')) || [];
      const updatedUsers = users.filter(u => u.email !== user.email);
      localStorage.setItem('criptonovaUsers', JSON.stringify(updatedUsers));

      setIsLoggedIn(false);
      setUser(null);
      setFavorites([]);
      setCurrentPage('login');
    }
  };


  const renderPage = () => {
    if (!isLoggedIn) {
      if (currentPage === 'register') {
         return <CriptoNovaRegister onRegisterSuccess={handleRegisterSuccess} onLoginClick={() => setCurrentPage('login')} />;
      }
      return <CriptoNovaLogin onLoginSuccess={handleLoginSuccess} onRegisterClick={() => setCurrentPage('register')} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <CriptoNovaDashboard user={user} cryptoPrices={allCryptoPrices} />;
      case 'market':
        return (
          <CriptoNovaMarketTable
            prices={displayedCryptoPrices}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onLoadMore={displayedCryptoPrices.length < allCryptoPrices.length ? handleLoadMore : null}
          />
        );
      case 'favorites':
        const favoritePrices = allCryptoPrices.filter(crypto => favorites.includes(crypto.symbol));
        return <CriptoNovaFavoritesList prices={favoritePrices} favorites={favorites} onToggleFavorite={handleToggleFavorite} />;
      case 'portfolio':
        const userPortfolioAssets = user ? user.portfolio.map(asset => {
             const currentPrice = allCryptoPrices.find(crypto => crypto.symbol === `${asset.symbol}USDT`);
             const valueUSD = currentPrice ? asset.quantity * parseFloat(currentPrice.price) : 0;
             return { ...asset, valueUSD };
        }) : [];
        const userTotalPortfolioValue = userPortfolioAssets.reduce((sum, asset) => sum + asset.valueUSD, 0);
        return <CriptoNovaPortfolio portfolioAssets={userPortfolioAssets} totalValue={userTotalPortfolioValue} />;
      case 'trade':
        return <CriptoNovaTrade cryptoPrices={allCryptoPrices} userBalance={user ? user.balance : 0} userPortfolio={user ? user.portfolio : []} onTrade={handleTrade} />;
      case 'news':
        return <div className="p-6 text-center text-gray-400">Vista de Noticias (Próximamente)</div>;
      case 'profile':
        return <CriptoNovaProfile user={user} onLogout={handleLogout} onResetData={handleResetData} />;
      case 'history':
         return <CriptoNovaTransactionHistory transactions={user ? user.transactions : []} />;
      case 'depositWithdraw':
         return (
           <CriptoNovaDepositWithdraw
             userBalance={user ? user.balance : 0}
             onDeposit={() => setShowPaymentGateway(true)}
             onWithdraw={handleWithdraw}
           />
         );
      case 'info': // Nuevo caso para la página de información
        return <CriptoNovaInfo />;
      default:
        return <CriptoNovaDashboard user={user} cryptoPrices={allCryptoPrices} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {isLoggedIn && <CriptoNovaHeader onLogout={handleLogout} />}
      {isLoggedIn && <CriptoNovaNavigation currentPage={currentPage} onNavigate={setCurrentPage} />}
      <main className={isLoggedIn ? "pt-4" : ""}>
        {renderPage()}
      </main>
      {showPaymentGateway && (
        <CriptoNovaPaymentGateway
          onDepositSuccess={handleDeposit}
          onCancel={() => setShowPaymentGateway(false)}
        />
      )}
    </div>
  );
};

export default App;

// DONE