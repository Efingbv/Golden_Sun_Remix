var RPG = RPG || {};

RPG.EnemyMenuItem = function (game_state, name, position, properties) {
    "use strict";
    RPG.MenuItem.call(this, game_state, name, position, properties);
};

RPG.EnemyMenuItem.prototype = Object.create(RPG.MenuItem.prototype);
RPG.EnemyMenuItem.prototype.constructor = RPG.EnemyMenuItem;

RPG.EnemyMenuItem.prototype.select = function () {
    "use strict";
    var enemy;
    // get enemy prefab
    enemy = this.game_state.prefabs[this.text];
    // attack selected enemy
    this.game_state.current_attack.hit(enemy);
    // disable menus
    this.game_state.prefabs.enemy_units_menu.disable();
    this.game_state.prefabs.player_units_menu.disable();
};

RPG.EnemyMenuItem.prototype.unSelect = function () {
    this.game_state.prefabs.enemy_units_menu.disable();
    
    if (this.game_state.prefabs.spell_menu) {
        this.game_state.prefabs.spell_menu.menu_items.forEach(function(items){
            items.kill();
        });
    }
    if (this.game_state.prefabs.djinn_menu) {
        this.game_state.prefabs.djinn_menu.menu_items.forEach(function(items){
            items.kill();
        });
    }

    this.game_state.prefabs.actions_menu.enable();
}