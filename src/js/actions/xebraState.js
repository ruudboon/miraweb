import createAction from "./createAction";

const changeClientName = createAction("changeClientName");
const connect = createAction("connect");
const disconnect = createAction("disconnect");
const reconnect = createAction("reconnect");
const init = createAction("init");
const setSupportedObjects = createAction("setSupportedObjects");

export default {
	changeClientName,
	disconnect,
	reconnect,
	connect,
	init,
	setSupportedObjects
};
