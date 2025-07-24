const authData = {
  stg: {
    baseURL: 'https://stgportal2.solapayments.com',
    credentials: {
      username: 'automationtests@cardknox.com',
      password: 'Automation1234567!'
      // username: 'ababenko@solapayments.com',
      // password: 'portal_75X9Kt:kctVc:3V'
    }
  },
  dev: {
    baseURL: 'https://stgportal2.solapayments.com/login',
    credentials: {
      username: 'automationtests@cardknox.com',
      password: 'Automation1234567!'
    }
  },
  prod: {
    baseURL: 'https://portal2.solapayments.com/login',
    credentials: {
      username: 'automationtests@cardknox.com',
      password: 'Automation1234567!'
    },
  },
  testCards: {
    testCard1: '5555444433331111',
    testCard2: '4111111111111111',
    testCard3: '4222222222222222'
  },

  codes: {
    authCode: 'T4321A'
  },

   checking: {
    routingNumber: '021000021',
    accountNumber: '52184720082',
  }
};

export default authData;
