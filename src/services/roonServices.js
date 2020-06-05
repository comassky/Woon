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

    connectToRoon() {
        return new Promise( resolve => {
            this.roonInstance = new roonApi({
                extension_id: 'roon.web.comassky',
                display_name: 'Roon Web Application',
                display_version: '0.0.1',
                publisher: 'ComasSky',
                email: 'john.doe@gmail.com',

                core_paired: (coreResponse) => {
                    this.roonCore = coreResponse;

                    this.roonCore.services.RoonApiTransport.subscribe_zones((response, msg) => {
                        if (response === 'Subscribed') {
                            this.roonZones = msg.zones;
                        } else if (response === 'Changed') {
                            //  var z;
                            // if (msg.zones_removed) {
                            //     this.zoneArray = this.zoneArray.filter(item =>  msg.zones_removed.indexOf(item) < 0);
                            // } 
                            // if (msg.zones_added) msg.zones_added.find(e => v.zones[e.zone_id] = e);
                            // if (msg.zones_changed) msg.zones_changed.forEach(e => v.zones[e.zone_id] = e);
                            // v.$set('zones', v.zones); 
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

    updateVolume(outputId, value){
        this.roonCore.services.RoonApiTransport.change_volume(outputId, 'absolute', value);
    }

    playOrPause(){
        this.roonCore.services.RoonApiTransport.control(this.roonZones[0],streamAction.PLAY_OR_PAUSE);
    }
}

module.exports = RoonServices;