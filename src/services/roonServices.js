const roonApi = require('node-roon-api');
const roonTransport = require('node-roon-api-transport');
const roonImage = require('node-roon-api-image');
const roonBrowse = require('node-roon-api-browse');


const streamAction = {
    PLAY_OR_PAUSE: 'playpause',
    STOP: 'stop',
    PREVIOUS: 'previous',
    NEXT: 'next'
}


const RoonServices = class {

    roonInstance = {};
    roonCore = {};
    roonZones = [];

    constructor() { }

    connectToRoon(updateZone, updateSeek) {
        return new Promise(resolve => {
            this.roonInstance = new roonApi({
                extension_id: 'roon.web.comassky',
                display_name: 'Woon',
                display_version: '0.0.1',
                publisher: 'ComasSky',
                email: 'john.doe@gmail.com',

                core_paired: (coreResponse) => {
                    this.roonCore = coreResponse;

                    this.roonCore.services.RoonApiTransport.subscribe_zones((response, msg) => {
                        console.debug(response);
                        switch (response) {
                            case "Subscribed": {
                                this.roonZones = msg.zones;
                                break;
                            }
                            case "Changed": {
                                if (msg.zones_seek_changed) {
                                    updateSeek(msg);
                                }
                                if (msg.zones_changed) {
                                    updateZone(msg)
                                }
                                break;
                            }
                        }
                        resolve();
                    });
                },
                core_unpaired: (coreResponse) => {
                    this.roonCore = coreResponse;
                },
            });

            this.roonInstance.ws_connect({ host: '192.168.1.1', port: '9100', onclose: () => { } });

            this.roonInstance.init_services({
                required_services: [roonBrowse, roonTransport, roonImage],
            });



        });
    }

    searchArtist() {
        return this.roonCore.services.RoonApiBrowse.load({
            hierarchy: "browse"
        }, () => {
        });
    }

    getRoonZones() {
        return this.roonZones;
    }

    updateVolume(outputId, value) {
        this.roonCore.services.RoonApiTransport.change_volume(outputId, 'absolute', value);
    }

    playOrPause(zone) {
        this.roonCore.services.RoonApiTransport.control(zone, streamAction.PLAY_OR_PAUSE);
    }

    stopSong(zone) {
        this.roonCore.services.RoonApiTransport.control(zone, streamAction.STOP);
    }

    nextSong(zone) {
        this.roonCore.services.RoonApiTransport.control(zone, streamAction.NEXT);
    }

    previousSong(zone) {
        this.roonCore.services.RoonApiTransport.control(zone, streamAction.PREVIOUS);
    }

    getCurrentPlay(zone) {
        return zone;
    }

    getImage(imageId) {
        return "http://192.168.1.1:9100/api/image/" + imageId + "?scale=fit&width=500&height=500";
    }
}

export default new RoonServices;