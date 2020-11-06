
JPoke = (function(el,options){

    var obj = {};

    obj.options = options;

    var defaults = {
        rootWidth: 520,
        rootHeight: 400,
        sound: 'https://vgmdownloads.com/soundtracks/pokemon-gameboy-sound-collection/gbhogmtx/107-battle%20%28vs%20wild%20pokemon%29.mp3',
        background: 'https://userscontent2.emaze.com/images/79eae1a2-378d-4f2a-9d5c-e6e87ce676d8/1f505e92-e056-41eb-b77d-0749315c3ea6image7.jpeg',
        platform: 'https://www.spriters-resource.com/resources/sheet_icons/39/41996.png',
        pokemons: {
            player: {
                name: 'Lugia',
                level: 30,
                hp: 100,
                image: 'https://static.wikia.nocookie.net/pokemon/images/8/86/Lugia_Back_XY.gif/revision/latest/top-crop/width/150/height/150?cb=20141019120817',
            },
            wild: [
                {
                    name: 'Mewtwo',
                    level: 60,
                    hp: 100,
                    image: 'http://cdn.shopify.com/s/files/1/1793/0115/files/Mewtwo_compact.gif?v=1547044348'
                }
            ]
        }
    }

    for(property in defaults){
        if(!obj.options[property]){
            obj.options[property] = defaults[property];
        }
    }

    var player = obj.options.pokemons.player;
    var wildPokemons = obj.options.pokemons.wild;
    var currentOponent = null;

    // Private methods

    var getRandomWildPokemon = function(){
        currentOponent = wildPokemons[Math.floor(Math.random() * wildPokemons.length)]; 
        return currentOponent;
    }
    
    var createOverlayBattleEffect = function(){
        var darkContainerTop = document.createElement('div');
        darkContainerTop.classList.add('jpoke-darkContainer','top');
        var darkContainerBottom = document.createElement('div');
        darkContainerBottom.classList.add('jpoke-darkContainer','bottom');
        el.appendChild(darkContainerTop);
        el.appendChild(darkContainerBottom);

        var listener = function(){
            darkContainerBottom.remove();
            darkContainerTop.remove();
        }
        darkContainerTop.onanimationend = darkContainerBottom.animationend = listener;
        
    }

    var startBattleSound = function(){
        var battleSound = document.createElement('audio');
        battleSound.preload = 'auto';
        battleSound.src = obj.options.sound;
        battleSound.play();
    }

    var createPokemonStatus = function(type = 1){
        var pokemonName = null;
        var pokemonLevel = null;
        var useClass = null;

        if(type == 1){
            pokemonName = player.name;
            pokemonLevel = player.level;
            useClass = 'player';
        }else {
            pokemonName = currentOponent.name;;
            pokemonLevel = currentOponent.level;
            useClass = 'wild';
        }
        
        var container = document.createElement('div');
        var nameLevelContainer = document.createElement('div');
        var name = document.createElement('span');
        var level = document.createElement('span');
        var hpContainer = document.createElement('div');
        var hp = document.createElement('div');

        hp.classList.add('jpoke-hp');

        nameLevelContainer.appendChild(name);
        nameLevelContainer.appendChild(level);
        hpContainer.appendChild(hp);

        container.appendChild(nameLevelContainer);
        container.appendChild(hpContainer);

        container.classList.add('jpoke-status',useClass);
        nameLevelContainer.classList.add('jpoke-nameLevel');
        hpContainer.classList.add('jpoke-hpContainer');
        
        name.textContent = pokemonName.toUpperCase();
        level.textContent = "Lv" + pokemonLevel;
    
        el.appendChild(container);
    }

    var createPokemonContainer = function(){
    
        var playerContainer = document.createElement('div');
        var wildPokemonContainer = document.createElement('div');

        var playerPokemonImage = document.createElement('img');
        var wildPokemonImage = document.createElement('img');
        
        var playerPlatform = document.createElement('div');
        playerPlatform.classList.add('jpoke-platform','player');

        var platFormImage = document.createElement('img');
        playerPlatform.appendChild(platFormImage);

        var wildPlatform = document.createElement('div');
        var wildPlatformImage = document.createElement('img');

        wildPlatform.appendChild(wildPlatformImage);
        wildPlatform.classList.add('jpoke-platform','wild');

        playerContainer.appendChild(playerPlatform);
        wildPokemonContainer.appendChild(wildPlatform);

        platFormImage.src = wildPlatformImage.src = obj.options.platform;

        playerPokemonImage.classList.add('jpoke-pokemonImg');
        wildPokemonImage.classList.add('jpoke-pokemonImg');

        playerPokemonImage.src = player.image;
        wildPokemonImage.src = getRandomWildPokemon().image;

        playerContainer.classList.add('jpoke-pokemonContainer','player','left');
        wildPokemonContainer.classList.add('jpoke-pokemonContainer','wild','right');
        
        playerContainer.appendChild(playerPokemonImage);
        wildPokemonContainer.appendChild(wildPokemonImage);

        playerContainer.onanimationend = function(){
             createPokemonStatus(1);
             createPokemonStatus(2);
        }

        el.appendChild(wildPokemonContainer);
        el.appendChild(playerContainer);
    }

    //Global methods
    obj.battle = function(){
        
        setTimeout(function(){
           
            startBattleSound();
            createOverlayBattleEffect();
            createPokemonContainer();

        },2000);
        
    }   

    //event listeners

    //set default options or given options

    el.style.width = obj.options.rootWidth + 'px';
    el.style.height = obj.options.rootHeight + 'px';
    el.style.backgroundImage = `url("${obj.options.background}")`;

    //add default classes to elements
    el.classList.add('jpoke-root');

    return obj;

})