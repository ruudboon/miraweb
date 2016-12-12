import MiraUIObject from "./base.js";
import { POPOVER_TYPES } from "../stores/popover.js";
import * as PIXI from "pixi.js";

const KNOBHEIGHT = 6;
const PADDING = 2;
const KNOBPADDING = 2;
const ORIENTATION = Object.freeze({
	HORIZONTAL : 1,
	VERTICAL : 2
});

const STRIPED_TEXTURE_HORIZONTAL = new PIXI.Texture.fromImage("data:image/svg+xml;base64,PHN2ZyBpZD0iSGF0Y2hpbmciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij4NCiAgPHRpdGxlPmhhdGNoaW5nLWhvcml6b250YWw8L3RpdGxlPg0KICA8Zz4NCiAgICA8bGluZSB4MT0iMTEyLjMyIiB5MT0iLTE0My41MiIgeDI9IjM5OS4wNCIgeTI9IjE0My4yIiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9IjEwMy43OSIgeTE9Ii0xMzQuOTkiIHgyPSIzOTAuNTEiIHkyPSIxNTEuNzMiIHN0eWxlPSJmaWxsOiBub25lO3N0cm9rZTogI2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDogMTA7c3Ryb2tlLXdpZHRoOiA4cHgiLz4NCiAgICA8bGluZSB4MT0iOTUuMjUiIHkxPSItMTI2LjQ1IiB4Mj0iMzgxLjk3IiB5Mj0iMTYwLjI3IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9Ijg2LjcyIiB5MT0iLTExNy45MiIgeDI9IjM3My40NCIgeTI9IjE2OC44IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9Ijc4LjE5IiB5MT0iLTEwOS4zOSIgeDI9IjM2NC45MSIgeTI9IjE3Ny4zMyIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSI2OS42NSIgeTE9Ii0xMDAuODUiIHgyPSIzNTYuMzciIHkyPSIxODUuODciIHN0eWxlPSJmaWxsOiBub25lO3N0cm9rZTogI2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDogMTA7c3Ryb2tlLXdpZHRoOiA4cHgiLz4NCiAgICA8bGluZSB4MT0iNjEuMTIiIHkxPSItOTIuMzIiIHgyPSIzNDcuODQiIHkyPSIxOTQuNCIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSI1Mi41OSIgeTE9Ii04My43OSIgeDI9IjMzOS4zMSIgeTI9IjIwMi45MyIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSI0NC4wNSIgeTE9Ii03NS4yNSIgeDI9IjMzMC43NyIgeTI9IjIxMS40NyIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSIzNS41MiIgeTE9Ii02Ni43MiIgeDI9IjMyMi4yNCIgeTI9IjIyMCIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSIyNi45OSIgeTE9Ii01OC4xOSIgeDI9IjMxMy43MSIgeTI9IjIyOC41MyIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSIxOC40NSIgeTE9Ii00OS42NSIgeDI9IjMwNS4xNyIgeTI9IjIzNy4wNyIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSI5LjkyIiB5MT0iLTQxLjEyIiB4Mj0iMjk2LjY0IiB5Mj0iMjQ1LjYiIHN0eWxlPSJmaWxsOiBub25lO3N0cm9rZTogI2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDogMTA7c3Ryb2tlLXdpZHRoOiA4cHgiLz4NCiAgICA8bGluZSB4MT0iMS4zOSIgeTE9Ii0zMi41OSIgeDI9IjI4OC4xMSIgeTI9IjI1NC4xMyIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSItNy4xNSIgeTE9Ii0yNC4wNSIgeDI9IjI3OS41NyIgeTI9IjI2Mi42NyIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSItMTUuNjgiIHkxPSItMTUuNTIiIHgyPSIyNzEuMDQiIHkyPSIyNzEuMiIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSItMjQuMjEiIHkxPSItNi45OSIgeDI9IjI2Mi41MSIgeTI9IjI3OS43MyIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSItMzIuNzUiIHkxPSIxLjU1IiB4Mj0iMjUzLjk3IiB5Mj0iMjg4LjI3IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9Ii00MS4yOCIgeTE9IjEwLjA4IiB4Mj0iMjQ1LjQ0IiB5Mj0iMjk2LjgiIHN0eWxlPSJmaWxsOiBub25lO3N0cm9rZTogI2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDogMTA7c3Ryb2tlLXdpZHRoOiA4cHgiLz4NCiAgICA8bGluZSB4MT0iLTQ5LjgxIiB5MT0iMTguNjEiIHgyPSIyMzYuOTEiIHkyPSIzMDUuMzMiIHN0eWxlPSJmaWxsOiBub25lO3N0cm9rZTogI2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDogMTA7c3Ryb2tlLXdpZHRoOiA4cHgiLz4NCiAgICA8bGluZSB4MT0iLTU4LjM1IiB5MT0iMjcuMTUiIHgyPSIyMjguMzciIHkyPSIzMTMuODciIHN0eWxlPSJmaWxsOiBub25lO3N0cm9rZTogI2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDogMTA7c3Ryb2tlLXdpZHRoOiA4cHgiLz4NCiAgICA8bGluZSB4MT0iLTY2Ljg4IiB5MT0iMzUuNjgiIHgyPSIyMTkuODQiIHkyPSIzMjIuNCIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSItNzUuNDEiIHkxPSI0NC4yMSIgeDI9IjIxMS4zMSIgeTI9IjMzMC45MyIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSItODMuOTUiIHkxPSI1Mi43NSIgeDI9IjIwMi43NyIgeTI9IjMzOS40NyIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSItOTIuNDgiIHkxPSI2MS4yOCIgeDI9IjE5NC4yNCIgeTI9IjM0OCIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSItMTAxLjAxIiB5MT0iNjkuODEiIHgyPSIxODUuNzEiIHkyPSIzNTYuNTMiIHN0eWxlPSJmaWxsOiBub25lO3N0cm9rZTogI2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDogMTA7c3Ryb2tlLXdpZHRoOiA4cHgiLz4NCiAgICA8bGluZSB4MT0iLTEwOS41NSIgeTE9Ijc4LjM1IiB4Mj0iMTc3LjE3IiB5Mj0iMzY1LjA3IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9Ii0xMTguMDgiIHkxPSI4Ni44OCIgeDI9IjE2OC42NCIgeTI9IjM3My42IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9Ii0xMjYuNjEiIHkxPSI5NS40MSIgeDI9IjE2MC4xMSIgeTI9IjM4Mi4xMyIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSItMTM1LjE1IiB5MT0iMTAzLjk1IiB4Mj0iMTUxLjU3IiB5Mj0iMzkwLjY3IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9Ii0xNDMuNjgiIHkxPSIxMTIuNDgiIHgyPSIxNDMuMDQiIHkyPSIzOTkuMiIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICA8L2c+DQogIDxyZWN0IHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiBzdHlsZT0iZmlsbDogbm9uZSIvPg0KPC9zdmc+DQo=");
const STRIPED_TEXTURE_VERTICAL = new PIXI.Texture.fromImage("data:image/svg+xml;base64,PHN2ZyBpZD0iSGF0Y2hpbmciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij4NCiAgPHRpdGxlPmhhdGNoaW5nLXZlcnRpY2FsPC90aXRsZT4NCiAgPGc+DQogICAgPGxpbmUgeDE9IjExMi4zMiIgeTE9IjM5OS4yIiB4Mj0iMzk5LjA0IiB5Mj0iMTEyLjQ4IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9IjEwMy43OSIgeTE9IjM5MC42NyIgeDI9IjM5MC41MSIgeTI9IjEwMy45NSIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSI5NS4yNSIgeTE9IjM4Mi4xMyIgeDI9IjM4MS45NyIgeTI9Ijk1LjQxIiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9Ijg2LjcyIiB5MT0iMzczLjYiIHgyPSIzNzMuNDQiIHkyPSI4Ni44OCIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSI3OC4xOSIgeTE9IjM2NS4wNyIgeDI9IjM2NC45MSIgeTI9Ijc4LjM1IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9IjY5LjY1IiB5MT0iMzU2LjUzIiB4Mj0iMzU2LjM3IiB5Mj0iNjkuODEiIHN0eWxlPSJmaWxsOiBub25lO3N0cm9rZTogI2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDogMTA7c3Ryb2tlLXdpZHRoOiA4cHgiLz4NCiAgICA8bGluZSB4MT0iNjEuMTIiIHkxPSIzNDgiIHgyPSIzNDcuODQiIHkyPSI2MS4yOCIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSI1Mi41OSIgeTE9IjMzOS40NyIgeDI9IjMzOS4zMSIgeTI9IjUyLjc1IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9IjQ0LjA1IiB5MT0iMzMwLjkzIiB4Mj0iMzMwLjc3IiB5Mj0iNDQuMjEiIHN0eWxlPSJmaWxsOiBub25lO3N0cm9rZTogI2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDogMTA7c3Ryb2tlLXdpZHRoOiA4cHgiLz4NCiAgICA8bGluZSB4MT0iMzUuNTIiIHkxPSIzMjIuNCIgeDI9IjMyMi4yNCIgeTI9IjM1LjY4IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9IjI2Ljk5IiB5MT0iMzEzLjg3IiB4Mj0iMzEzLjcxIiB5Mj0iMjcuMTUiIHN0eWxlPSJmaWxsOiBub25lO3N0cm9rZTogI2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDogMTA7c3Ryb2tlLXdpZHRoOiA4cHgiLz4NCiAgICA8bGluZSB4MT0iMTguNDUiIHkxPSIzMDUuMzMiIHgyPSIzMDUuMTciIHkyPSIxOC42MSIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSI5LjkyIiB5MT0iMjk2LjgiIHgyPSIyOTYuNjQiIHkyPSIxMC4wOCIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSIxLjM5IiB5MT0iMjg4LjI3IiB4Mj0iMjg4LjExIiB5Mj0iMS41NSIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSItNy4xNSIgeTE9IjI3OS43MyIgeDI9IjI3OS41NyIgeTI9Ii02Ljk5IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9Ii0xNS42OCIgeTE9IjI3MS4yIiB4Mj0iMjcxLjA0IiB5Mj0iLTE1LjUyIiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9Ii0yNC4yMSIgeTE9IjI2Mi42NyIgeDI9IjI2Mi41MSIgeTI9Ii0yNC4wNSIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSItMzIuNzUiIHkxPSIyNTQuMTMiIHgyPSIyNTMuOTciIHkyPSItMzIuNTkiIHN0eWxlPSJmaWxsOiBub25lO3N0cm9rZTogI2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDogMTA7c3Ryb2tlLXdpZHRoOiA4cHgiLz4NCiAgICA8bGluZSB4MT0iLTQxLjI4IiB5MT0iMjQ1LjYiIHgyPSIyNDUuNDQiIHkyPSItNDEuMTIiIHN0eWxlPSJmaWxsOiBub25lO3N0cm9rZTogI2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDogMTA7c3Ryb2tlLXdpZHRoOiA4cHgiLz4NCiAgICA8bGluZSB4MT0iLTQ5LjgxIiB5MT0iMjM3LjA3IiB4Mj0iMjM2LjkxIiB5Mj0iLTQ5LjY1IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9Ii01OC4zNSIgeTE9IjIyOC41MyIgeDI9IjIyOC4zNyIgeTI9Ii01OC4xOSIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSItNjYuODgiIHkxPSIyMjAiIHgyPSIyMTkuODQiIHkyPSItNjYuNzIiIHN0eWxlPSJmaWxsOiBub25lO3N0cm9rZTogI2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDogMTA7c3Ryb2tlLXdpZHRoOiA4cHgiLz4NCiAgICA8bGluZSB4MT0iLTc1LjQxIiB5MT0iMjExLjQ3IiB4Mj0iMjExLjMxIiB5Mj0iLTc1LjI1IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9Ii04My45NSIgeTE9IjIwMi45MyIgeDI9IjIwMi43NyIgeTI9Ii04My43OSIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSItOTIuNDgiIHkxPSIxOTQuNCIgeDI9IjE5NC4yNCIgeTI9Ii05Mi4zMiIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSItMTAxLjAxIiB5MT0iMTg1Ljg3IiB4Mj0iMTg1LjcxIiB5Mj0iLTEwMC44NSIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSItMTA5LjU1IiB5MT0iMTc3LjMzIiB4Mj0iMTc3LjE3IiB5Mj0iLTEwOS4zOSIgc3R5bGU9ImZpbGw6IG5vbmU7c3Ryb2tlOiAjZmZmO3N0cm9rZS1taXRlcmxpbWl0OiAxMDtzdHJva2Utd2lkdGg6IDhweCIvPg0KICAgIDxsaW5lIHgxPSItMTE4LjA4IiB5MT0iMTY4LjgiIHgyPSIxNjguNjQiIHkyPSItMTE3LjkyIiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9Ii0xMjYuNjEiIHkxPSIxNjAuMjciIHgyPSIxNjAuMTEiIHkyPSItMTI2LjQ1IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9Ii0xMzUuMTUiIHkxPSIxNTEuNzMiIHgyPSIxNTEuNTciIHkyPSItMTM0Ljk5IiBzdHlsZT0iZmlsbDogbm9uZTtzdHJva2U6ICNmZmY7c3Ryb2tlLW1pdGVybGltaXQ6IDEwO3N0cm9rZS13aWR0aDogOHB4Ii8+DQogICAgPGxpbmUgeDE9Ii0xNDMuNjgiIHkxPSIxNDMuMiIgeDI9IjE0My4wNCIgeTI9Ii0xNDMuNTIiIHN0eWxlPSJmaWxsOiBub25lO3N0cm9rZTogI2ZmZjtzdHJva2UtbWl0ZXJsaW1pdDogMTA7c3Ryb2tlLXdpZHRoOiA4cHgiLz4NCiAgPC9nPg0KICA8cmVjdCB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgc3R5bGU9ImZpbGw6IG5vbmUiLz4NCjwvc3ZnPg0K");

export default class Gain extends MiraUIObject {

	constructor(stateObj) {
		super(stateObj);

		this._orientation = ORIENTATION.HORIZONTAL;
	}

	_popoverType() {
		return POPOVER_TYPES.VALUE_LABEL;
	}

	_popoverDescription(params) {
		const { distance } = params;
		return `${distance}`;
	}

	paint(mgraphics, params) {
		const {
			orientation,
			bgcolor,
			stripecolor,
			knobcolor,
			width,
			height
		} = params;
		let size = params.size;
		let distance = params.distance;
		const scale = this._getActiveFrameScale();

		if (size > 1) size = size - 1;
		if (distance > size) distance = size;

		// draw background
		mgraphics.set_source_rgba(bgcolor);
		mgraphics.rectangle(0, 0, width, height);
		mgraphics.fill();

		// Set the orientation
		if (orientation === "Vertical") this._orientation = ORIENTATION.VERTICAL;
		if (orientation === "Horizontal") this._orientation = ORIENTATION.HORIZONTAL;
		if (orientation === "Automatic") this._orientation = (width < height) ? ORIENTATION.VERTICAL : ORIENTATION.HORIZONTAL;

		// Set the region with which you can interact
		if (this._orientation === ORIENTATION.HORIZONTAL) {
			this.interactionRect = [
				PADDING + KNOBHEIGHT / 2,
				PADDING,
				width - 2 * PADDING - KNOBHEIGHT,
				height - 2 * PADDING
			];
		} else {
			this.interactionRect = [
				PADDING,
				PADDING + KNOBHEIGHT / 2,
				width - 2 * PADDING,
				height - 2 * PADDING - KNOBHEIGHT
			];
		}

		if (this._orientation === ORIENTATION.VERTICAL) {
			let knobCenterY = (1 - distance / size) * this.interactionRect[3] + this.interactionRect[1];

			// draw inactive stripes
			const inactiveHeight = knobCenterY - PADDING - KNOBHEIGHT / 2 - KNOBPADDING;
			if (inactiveHeight > 0) {
				mgraphics.rectangle(PADDING, PADDING, width - 2 * PADDING, inactiveHeight);
				mgraphics.set_pattern(STRIPED_TEXTURE_VERTICAL, stripecolor);
				mgraphics.fill();
			}

			// draw active stripes
			const activeHeight = height - knobCenterY - PADDING - KNOBHEIGHT / 2 - KNOBPADDING;
			if (activeHeight > 0) {
				mgraphics.rectangle(PADDING, height - PADDING, width - 2 * PADDING, -activeHeight);
				mgraphics.set_pattern(STRIPED_TEXTURE_VERTICAL, knobcolor);
				mgraphics.fill();
			}

			// draw the knob
			mgraphics.rectangle(PADDING + 0.5 / scale, knobCenterY - KNOBHEIGHT / 2, width - 2 * PADDING, KNOBHEIGHT);
			mgraphics.set_source_rgba(knobcolor);
			mgraphics.fill();
		} else {
			let knobCenterX = (distance / size) * this.interactionRect[2] + this.interactionRect[0];

			// draw inactive stripes
			const inactiveWidth = width - knobCenterX - PADDING - KNOBPADDING - KNOBHEIGHT / 2;
			if (inactiveWidth > 0) {
				mgraphics.rectangle(width - PADDING, PADDING, -inactiveWidth, height - 2 * PADDING);
				mgraphics.set_pattern(STRIPED_TEXTURE_HORIZONTAL, stripecolor);
				mgraphics.fill();
			}

			// draw active stripes
			const activeWidth = knobCenterX - PADDING - KNOBPADDING - KNOBHEIGHT / 2;
			if (activeWidth > 0) {
				mgraphics.rectangle(PADDING, PADDING, activeWidth, height - 2 * PADDING);
				mgraphics.set_pattern(STRIPED_TEXTURE_HORIZONTAL, knobcolor);
				mgraphics.fill();
			}

			// draw knob
			mgraphics.rectangle(knobCenterX - KNOBHEIGHT / 2, PADDING + 0.5 / scale, KNOBHEIGHT, height - 2 * PADDING);
			mgraphics.set_source_rgba(knobcolor);
			mgraphics.fill();
		}

		if (this.isPopoverVisible()) this.updatePopover(this._popoverDescription(params));
	}

	pointerDown(event, params) {
		this._inTouch = true;
		this.showPopover(this._popoverType(), this._popoverDescription(params));
		this.pointerMove(event, params);
	}

	pointerMove(event, params) {
		const size = params.size - 1;
		const interactionCoords = this.interactionCoordsForEvent(event);

		if (interactionCoords) {
			let newVal = size * ((this._orientation === ORIENTATION.VERTICAL) ? 1 - interactionCoords[1] : interactionCoords[0]);
			newVal = Math.round(newVal);
			newVal = (newVal > size) ? size : newVal;
			newVal = (newVal < 0) ? 0 : newVal;
			this.setParamValue("distance", newVal);
		}
	}

	pointerUp(event, params) {
		this._inTouch = false;
		this.render();
		this.hidePopover();
	}
}

Gain.NAME = "gain~";