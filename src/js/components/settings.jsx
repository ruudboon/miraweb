import React from "react";
import { CONNECTION_STATES, VIEW_MODES, VERSION as XEBRA_VERSION } from "xebra.js";
import * as FrameActions from "../actions/frame.js";
import * as SettingsActions from "../actions/settings.js";
import * as XebraStateActions from "../actions/xebraState.js";
import FrameStore from "../stores/frame.js";
import SettingsStore from "../stores/settings.js";
import XebraStateStore from "../stores/xebraState.js";
import { SETTING_SCREENS, VERSION } from "../lib/constants.js";
import { supportsFullScreen } from "../lib/utils.js";

import Button from "./button.jsx";
import Column from "./column.jsx";
import Dialog from "./dialog.jsx";
import FormField from "./formField.jsx";
import Grid from "./grid.jsx";
import InfoText from "./infoText.jsx";

const BASE_CLASS = "mw-settings";

export default class Settings extends React.Component {

	constructor(props) {
		super(props);

		this.state = this._buildState();
		this._unsubscribes = [];
		this._unsubscribes.push(SettingsStore.listen(this._onUpdate.bind(this)));
		this._unsubscribes.push(FrameStore.listen(this._onUpdate.bind(this)));
		this._unsubscribes.push(XebraStateStore.listen(this._onUpdate.bind(this)));
	}

	componentWillUnmount() {
		this._unsubscribes.forEach((f) => {
			f();
		});
	}

	_buildState() {
		return {
			clientNameEdits : this.state && this.state.clientNameEdits ? this.state.clientNameEdits : null,
			clientName : XebraStateStore.getName(),
			connectionStatus : XebraStateStore.getConnectionState(),
			connectionInfo : XebraStateStore.getConnectionInfo(),
			selectedTab : SettingsStore.getSelectedTab(),
			settings : SettingsStore.getSettings(),
			show : SettingsStore.areShown() && SettingsStore.getShownScreen() === SETTING_SCREENS.CONFIG,
			tab : SettingsStore.getSelectedTab(),
			viewMode : FrameStore.getGlobalViewMode()
		};
	}

	_onUpdate() {
		this.setState(this._buildState());
	}

	_onClientNameChange(e) {
		this.setState({ clientNameEdits : e.target.value });
	}

	_onClientNameChangeSubmit(e) {
		const name = e.target.value;
		if (name) XebraStateActions.changeClientName(e.target.value);
		this.setState({ clientNameEdits : null });
	}

	_onDisconnect() {
		XebraStateActions.disconnect();
	}

	_onToggleView(e) {
		SettingsActions.toggleView();
	}

	_onChangeViewMode(e) {
		FrameActions.setGlobalViewMode(parseInt(e.target.value, 10));
	}

	_onToggleFullscreen() {
		SettingsActions.changeSetting("fullscreen", !SettingsStore.getSettingState("fullscreen"));
	}

	_onShowAboutScreen() {
		SettingsActions.toggleView(SETTING_SCREENS.ABOUT);
	}

	render() {

		let viewModeHint;
		switch (this.state.viewMode) {
			case VIEW_MODES.LINKED:
				viewModeHint = "Linked: Mirrors Max's current view";
				break;
			case VIEW_MODES.PRESENTATION:
				viewModeHint = "Presentation: Mirrors Max's presentation view";
				break;
			case VIEW_MODES.PATCHING:
				viewModeHint = "Patching: Mirrors Max's patching view";
				break;
		}

		let connectionHint;
		switch (this.state.connectionStatus) {
			case CONNECTION_STATES.INIT:
				connectionHint = "Initializing";
				break;
			case CONNECTION_STATES.CONNECTING:
				connectionHint = "Connecting...";
				break;
			case CONNECTION_STATES.RECONNECTING:
				connectionHint = "Reconnecting";
				break;
			case CONNECTION_STATES.DISCONNECTED:
				connectionHint = "Disconnected";
				break;
		}

		return (
			<Dialog show={ this.state.show } onClose={ this._onToggleView.bind(this) } title="Configuration" >
				<div className={ BASE_CLASS } >
					<Grid>
						<Column size={ 12 } >
							<FormField htmlFor="max_server" label="Max Server" >
								<input readOnly value={ this.state.connectionInfo } />
								{ connectionHint ? <InfoText>{ connectionHint }</InfoText> : null }
								{ this.state.connectionStatus === CONNECTION_STATES.CONNECTED ? (
										<Button buttonStyle="error" onClick={ this._onDisconnect.bind(this) } size="sm" >Disconnect</Button>
									) : null
								}

							</FormField>
						</Column>
						<Column size={ 12 } >
							<FormField htmlFor="name" label="Client ID" >
								<input value={ this.state.clientNameEdits || this.state.clientName }
									onChange={ this._onClientNameChange.bind(this) }
									onBlur={ this._onClientNameChangeSubmit.bind(this) }
								/>
							</FormField>
						</Column>
						<Column size={ 12 } >
							<FormField htmlFor="version" label="App Version" >
								<input readOnly value={ VERSION } />
							</FormField>
						</Column>
						<Column size={ 12 } >
							<FormField htmlFor="protocol_version" label="Xebra Protocol Version" >
								<input readOnly value={ XEBRA_VERSION } />
							</FormField>
						</Column>
						<Column size={ 12 } >
							<FormField htmlFor="view_mode" label="View Mode" >
								<select value={ this.state.viewMode } onChange={ this._onChangeViewMode.bind(this) } >
									<option value={ VIEW_MODES.LINKED }>Linked</option>
									<option value={ VIEW_MODES.PATCHING }>Patching</option>
									<option value={ VIEW_MODES.PRESENTATION }>Presentation</option>
								</select>
								<div className="text-center" >
									<small className="text-center" >{ viewModeHint }</small>
								</div>
							</FormField>
						</Column>
						{ supportsFullScreen() ? (
							<Column size={ 12 } >
								<FormField label="Fullscreen">
									<Button buttonStyle="secondary" onClick={ this._onToggleFullscreen.bind(this) } size="sm" >{ this.state.settings.fullscreen ? "Exit" : "Go" } Fullscreen</Button>
								</FormField>
							</Column> ) : null
						}
						<Column size={ 12 } className="text-center">
							<a className="mw-about-link" onClick={ this._onShowAboutScreen.bind(this) } size="sm">About MiraWeb</a>
						</Column>
					</Grid>
				</div>
			</Dialog>
		);
	}
}
