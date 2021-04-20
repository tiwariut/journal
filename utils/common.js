module.exports = {
  getFileExtension: (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
  },

  getRandomString: () => {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var string_length = 8;
    var randomString = '';
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomString += chars.substring(rnum, rnum + 1);
    }
    return randomString;
  },

  eliminateDuplicates: (arr) => {
    var i,
      len = arr.length,
      out = [],
      obj = {};

    for (i = 0; i < len; i++) {
      obj[arr[i]] = 0;
    }
    for (i in obj) {
      out.push(i);
    }
    return out;
  },

  calcAverage: (arr, roundOff) => {
    // Getting sum of numbers
    var sum = arr.reduce(function (a, b) {
      return a + b;
    }, 0);
    let average = parseFloat((sum / arr.length).toFixed(roundOff));
    return average;
  },

  // kilometer convert to meter
  kilometerToMeter: (km) => {
    return parseFloat(km * 1000);
  },

  calcRatingAverages: (sum, count) => {
    // Normal
    average = (sum / count).toFixed(1);

    // Bayesian
    let C = 5,
      m = 2.5;
    bayesianAverage = ((C * m + average * count) / (C + count)).toFixed(1);

    return {
      average,
      bayesianAverage
    };
  }
};
