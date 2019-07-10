const fs = require("fs");
const os = require("os");
class Translator {
  static translate(origin, destiny, opts = false) {
    let error = false,
      definitivo = [];
    if (opts == true) {
      if (origin.length == undefined || origin.length == 0) {
        error = true;
      } else {
        definitivo = origin.map(arr => {
          switch (arr[1]) {
            case "F":
              if (arr[2] == "C") {
                arr.push(
                  Math.round((((parseFloat(arr[0]) - 32) * 5) / 9) * 100) / 100
                );
              } else if (arr[2] == "K") {
                arr.push(
                  Math.round(
                    (((parseFloat(arr[0]) - 32) * 5) / 9 + 273.15) * 100
                  ) / 100
                );
              } else {
                arr.push(parseFloat(arr[0]));
              }
              break;
            case "K":
              if (arr[2] == "C") {
                arr.push(Math.round((parseFloat(arr[0]) - 273.15) * 100) / 100);
              } else if (arr[2] == "F") {
                arr.push(
                  Math.round(
                    (parseFloat(arr[0]) - (273.15 * 9) / 5 + 32) * 100
                  ) / 100
                );
              } else {
                arr.push(parseFloat(arr[0]));
              }
              break;
            case "C":
              if (arr[2] == "F") {
                arr.push(
                  Math.round((parseFloat((arr[0] * 9) / 5) + 32) * 100) / 100
                );
              } else if (arr[2] == "K") {
                arr.push(Math.round((parseFloat(arr[0]) + 273.15) * 100) / 100);
              } else {
                arr.push(parseFloat(arr[0]));
              }
              break;
            default:
              error = true;
              break;
          }
          return arr;
        });
      }
      if (error) {
        throw "Not a current temperature system";
      }
      return definitivo;
    } else {
      let res = this.readFile(origin);
      let error = false,
        definitivo = [];
      if (res.length == undefined || res.length == 0) {
        error = true;
      } else {
        definitivo = res.map(arr => {
          switch (arr[1]) {
            case "F":
              if (arr[2] == "C") {
                arr.push(
                  Math.round((((parseFloat(arr[0]) - 32) * 5) / 9) * 100) / 100
                );
              } else if (arr[2] == "K") {
                arr.push(
                  Math.round(
                    (((parseFloat(arr[0]) - 32) * 5) / 9 + 273.15) * 100
                  ) / 100
                );
              } else {
                arr.push(parseFloat(arr[0]));
              }
              break;
            case "K":
              if (arr[2] == "C") {
                arr.push(Math.round((parseFloat(arr[0]) - 273.15) * 100) / 100);
              } else if (arr[2] == "F") {
                arr.push(
                  Math.round(
                    (parseFloat(arr[0]) - (273.15 * 9) / 5 + 32) * 100
                  ) / 100
                );
              } else {
                arr.push(parseFloat(arr[0]));
              }
              break;
            case "C":
              if (arr[2] == "F") {
                arr.push(
                  Math.round((parseFloat((arr[0] * 9) / 5) + 32) * 100) / 100
                );
              } else if (arr[2] == "K") {
                arr.push(Math.round((parseFloat(arr[0]) + 273.15) * 100) / 100);
              } else {
                arr.push(parseFloat(arr[0]));
              }
              break;
            default:
              error = true;
              break;
          }
          return arr;
        });
      }
      if (error) {
        throw "Not a current temperature system";
      }
      this.writeFile(definitivo, destiny);
    }
  }

  static readFile(route) {
    try {
      let data = fs.readFileSync(route, "utf8"),
        regex = /\r\n/gi;
      data = data.replace(regex, ",");
      let response = [...data.split(",")];
      let res = [],
        fila = [];

      for (let i = 0; i < response.length / 3; i++) {
        for (let z = 0; z < 3; z++) fila.push(response[i * 3 + z]);
        res.push(fila);
        fila = [];
      }
      return res;
    } catch (err) {
      console.error(err);
    }
  }

  static writeFile(definitivo, route) {
    fs.writeFile(route, "", err => {
      if (err) console.error(err);
    });

    definitivo.forEach(arr => {
      fs.appendFile(route, `${arr.toString()}${os.EOL}`, err => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });
  }
}

module.exports = Translator;
