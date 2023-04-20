"use strict"

const logoutButton = new LogoutButton();

logoutButton.action = data => {
    ApiConnector.logout(response => {
        if (response.success === true) {
            location.reload();
        } 
    });
}

ApiConnector.current(response => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

function getStocksCall() {
    ApiConnector.getStocks(response => {
        if (response.success === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

getStocksCall();
setInterval(getStocksCall, 60000);

const moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Ваш счёт успешно пополнен!");
        } else {
            moneyManager.setMessage(response.error, "Произошла ошибка!")
        }
    });
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Валюта успешно конвертирована!");
        } else {
            moneyManager.setMessage(response.error, "Произошла ошибка!")
        }
    });
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Перевод средств выполнен успешно!");
        } else {
            moneyManager.setMessage(response.error, "Произошла ошибка!")
        }
    });
}

const favoritesWidget = new FavoritesWidget;

ApiConnector.getFavorites(response => {
    if (response.success === true) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(response.success, "Пользователь успешно добавлен в адресную книгу!");
        } else {
            moneyManager.setMessage(response.error, "Произошла ошибка!")
        }
    });
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success === true) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(response.success, "Пользователь был удалён из адресной книги!");
        } else {
            moneyManager.setMessage(response.error, "Произошла ошибка!")
        }
    });
}





