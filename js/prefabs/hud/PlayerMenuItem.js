var RPG = RPG || {};

RPG.PlayerMenuItem = function (game_state, name, position, properties) {
    "use strict";
    RPG.MenuItem.call(this, game_state, name, position, properties);

    if (this.game_state.i < 3) {
        this.game_state["PlayerMenuItem"+this.game_state.i] = this;
        this.game_state.i++;
    }

    console.log(this);
        
    this.prefab = this.game_state.prefabs[properties.text];

    this.healthMax = this.prefab.stats["health"];
    this.manaMax = this.prefab.stats["mana"];

    // this.player_unit_health = new RPG.ShowStat(this.game_state, this.text + "_health", {x: 240, y: this.game_state.party_data[this._text].position.y - 30}, {group: "hud", text: "", style: properties.style, prefab: this.text, stat: "health"});
    
    this.player_unit_health = new HealthBar(this.game, {
                                                            width: this.prefab.stats["maxHealth"],
                                                            height: 8,
                                                            x: 250,
                                                            y: this.game_state.party_data[this._text].position.y - 28,
                                                            bg: {
                                                                color: "red"
                                                            },
                                                            bar: {
                                                                color: "#00cc33"
                                                            },
                                                            flipped: true
                                                        });
    this.player_unit_mana = new HealthBar(this.game, {
                                                            width: this.prefab.stats["maxMana"],
                                                            height: 8,
                                                            x: 250,
                                                            y: this.game_state.party_data[this._text].position.y - 18,
                                                            bg: {
                                                                color: "red"
                                                            },
                                                            bar: {
                                                                color: "blue"
                                                            },
                                                            flipped: true
                                                        });
    // this.player_unit_mana = new RPG.ShowStat(this.game_state, this.text + "_health", {x: 270, y: this.game_state.party_data[this._text].position.y - 30}, {group: "hud", text: "", style: properties.style, prefab: this.text, stat: "mana"});

    switch(this._text) {
        case "fighter":
            if (this.game_state.damageFighter) {
                this.damageFighter = (this.game_state.damageFighter * 100) / this.game_state.PlayerMenuItem0.healthMax;
                this.damageFighter = 100 - this.damageFighter;
                this.player_unit_health.setPercent(this.damageFighter);
            }
            break;

        case "mage":
            if (this.game_state.damageMage) {
                this.damageMage = (this.game_state.damageMage * 100) / this.healthMax;
                this.damageMage = 100 - this.damageMage;
                this.player_unit_health.setPercent(this.damageMage); 
            }
            break;

        case "ranger":
            if (this.game_state.damageRanger) {
                this.damageRanger = (this.game_state.damageRanger * 100) / this.healthMax;
                this.damageRanger = 100 - this.damageRanger;
                this.player_unit_health.setPercent(this.damageRanger);
            }
            break;
    }

};

RPG.PlayerMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.PlayerMenuItem.prototype.constructor = RPG.PlayerMenuItem;

RPG.PlayerMenuItem.prototype.select = function () {
    "use strict";
    var player_unit;
    // get selected player unit
    player_unit = this.game_state.prefabs[this.text];
    // use current selected item on selected unit
    this.game_state.prefabs.inventory.use_item(this.game_state.current_item, player_unit);
    
    // show actions menu again
    this.game_state.prefabs.items_menu.disable();
    this.game_state.prefabs.items_menu.hide();
    this.game_state.prefabs.actions_menu.show();
    this.game_state.prefabs.actions_menu.enable();
};

RPG.PlayerMenuItem.prototype.update = function(){

    //this.player_unit_health.setPercent();
};