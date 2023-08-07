const { connectTable } = require("../../../eventSocket");

module.exports = function (user, function_call, callback) {
  const { session } = user;
  const { parameter, name } = function_call;
  console.log("调用了", name, parameter);
  if (session && connectTable[session]) {
    connectTable[session].send(
      JSON.stringify({
        type: "event",
        name: "createBarView",
        parameter,
      })
    );
  }
};
