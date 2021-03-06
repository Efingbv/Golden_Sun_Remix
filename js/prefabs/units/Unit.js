var RPG = RPG || {};

RPG.Unit = function (game_state, name, position, properties) {
    "use strict";
    console.log(properties);
    RPG.Prefab.call(this, game_state, name, position, properties);

    switch(name) {
        case "Isaac":
            this.PhysicalAttackAnimation = this.animations.add("PhysicalAttack", [6, 8], 3, false);
            this.MagicalAttackAnimation = this.animations.add("MagicAttack", [12, 14, 16], 3, false);

            this.BasicMovementAnimation = this.animations.add('BasicMovement', [0, 2, 4], 4, true);

            this.BasicMovementAnimation.play("BasicMovement");
            
            this.resetAnimation = function(){

                this.BasicMovementAnimation.play("BasicMovement");
            }

            this.PhysicalAttackAnimation.onComplete.add(this.resetAnimation, this);
            this.MagicalAttackAnimation.onComplete.add(this.resetAnimation, this);
            break;

        case "Sheba":
            this.PhysicalAttackAnimation = this.animations.add("PhysicalAttack", [12,14], 3, false);
            this.MagicalAttackAnimation = this.animations.add("MagicAttack", [6, 8, 10], 3, false);

            this.BasicMovementAnimation = this.animations.add('BasicMovement', [0, 2, 4], 4, true);

            this.BasicMovementAnimation.play("BasicMovement");
            
            this.resetAnimation = function(){

                this.BasicMovementAnimation.play("BasicMovement");
            }

            this.PhysicalAttackAnimation.onComplete.add(this.resetAnimation, this);
            this.MagicalAttackAnimation.onComplete.add(this.resetAnimation, this);
            break;

        case "Jenna":
            this.PhysicalAttackAnimation = this.animations.add("PhysicalAttack", [6, 8], 3, false);
            this.MagicalAttackAnimation = this.animations.add("MagicAttack", [10, 12, 14], 2, false);

            this.BasicMovementAnimation = this.animations.add('BasicMovement', [0, 2, 4], 4, true);

            this.BasicMovementAnimation.play("BasicMovement");
            
            this.resetAnimation = function(){

                this.BasicMovementAnimation.play("BasicMovement");
            }

            this.PhysicalAttackAnimation.onComplete.add(this.resetAnimation, this);
            this.MagicalAttackAnimation.onComplete.add(this.resetAnimation, this);
            break;
        default:
            this.PhysicalAttackAnimation =  this.animations.add("PhysicalAttack", [3,4], 3, false);
            this.BasicMovementAnimation = this.animations.add('BasicMovement', [0, 1, 2], 4, true);

            this.BasicMovementAnimation.play("BasicMovement");
            
            this.resetAnimation = function(){

                this.BasicMovementAnimation.play("BasicMovement");
            }

            this.PhysicalAttackAnimation.onComplete.add(this.resetAnimation, this);
            break;
        
    }

    this.anchor.setTo(0.5);
    this.stats = Object.create(properties.stats);
    
    this.attacked_animation = this.game_state.game.add.tween(this);
    this.attacked_animation.to({tint: 0xFF0000}, 200);
    this.attacked_animation.onComplete.add(this.restore_tint, this);
    
    this.act_turn = 0;
};

RPG.Unit.prototype = Object.create(RPG.Prefab.prototype);
RPG.Unit.prototype.constructor = RPG.Unit;

RPG.Unit.prototype.receive_damage = function (damage) {
    "use strict";

    //Set the percentage of hp of the player 
    switch(this.name) {
        case "Isaac":
            this.damageFighter = (this.game_state.damageFighter * 100) / this.game_state.PlayerMenuItem0.healthMax;
            this.damageFighter = 100 - this.damageFighter;
            this.game_state.PlayerMenuItem0.player_unit_health.setPercent(this.damageFighter); 
            break;

        case "Sheba":
            this.damageMage = (this.game_state.damageMage * 100) / this.game_state.PlayerMenuItem1.healthMax;
            this.damageMage = 100 - this.damageMage;
            this.game_state.PlayerMenuItem1.player_unit_health.setPercent(this.damageMage); 
            break;

        case "Jenna":
            this.damageRanger = (this.game_state.damageRanger * 100) / this.game_state.PlayerMenuItem2.healthMax;
            this.damageRanger = 100 - this.damageRanger;
            this.game_state.PlayerMenuItem2.player_unit_health.setPercent(this.damageRanger);
            break;
    }

    this.stats.health -= damage;
    this.attacked_animation.start();
    if (this.stats.health <= 0) {
        this.stats.health = 0;

        switch(this.name) {
            case "Isaac":
                this.game_state.PlayerMenuItem0.player_unit_health.kill();
                this.game_state.PlayerMenuItem0.player_unit_mana.kill();
                break;

            case "Sheba":
                this.game_state.PlayerMenuItem1.player_unit_health.kill();
                this.game_state.PlayerMenuItem1.player_unit_mana.kill();
                break;

            case "Jenna":
                this.game_state.PlayerMenuItem2.player_unit_health.kill();
                this.game_state.PlayerMenuItem2.player_unit_mana.kill();
                break;
        }

        this.kill();
    }
};

RPG.Unit.prototype.restore_tint = function () {
    "use strict";
    this.tint = 0xFFFFFF;
};

RPG.Unit.prototype.calculate_act_turn = function (current_turn) {
    "use strict";
    // calculate the act turn based on the unit speed
    this.act_turn = current_turn + Math.ceil(100 / this.stats.speed);
};