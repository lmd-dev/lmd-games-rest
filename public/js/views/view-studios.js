var ViewStudios = /** @class */ (function () {
    /**
     * Constructor
     * @param controllerStudios
     */
    function ViewStudios(controllerStudios) {
        this._controllerStudios = controllerStudios;
        this._controllerStudios.addObserver(this);
    }
    /**
     * Notification function of the view
     */
    ViewStudios.prototype.notify = function () {
        this.displayStudios();
        this.displayGames();
        this.displayEditGameDialog();
    };
    /**
     * Displays the list of studios
     */
    ViewStudios.prototype.displayStudios = function () {
        var _this = this;
        var list = document.getElementById('studios');
        list.innerHTML = '';
        this._controllerStudios.studios.forEach(function (studio) {
            var selected = _this._controllerStudios.selectedStudio && _this._controllerStudios.selectedStudio.id == studio.id;
            var item = '<div class="studio ' + (selected ? 'selected' : '') + '" data-id="' + studio.id + '">' + studio.name + '</div>';
            list.innerHTML += item;
        });
        document.querySelectorAll('.studio').forEach(function (item, index) {
            item.addEventListener('click', function () {
                _this._controllerStudios.selectStudio(parseInt(item.dataset.id));
            });
        });
    };
    /**
     * Displays games of the selected studio
     */
    ViewStudios.prototype.displayGames = function () {
        var _this = this;
        var list = document.getElementById('games');
        list.innerHTML = '';
        if (this._controllerStudios.selectedStudio) {
            this._controllerStudios.selectedStudio.games.forEach(function (game) {
                var item = '<div class="game" data-id="' + game.id + '"><div class="game-picture" style="background-image:url(' + game.picture + ');"></div><div class="game-title">' + game.name + '</div><div class="game-release-year">' + game.releaseYear + '</div></div>';
                list.innerHTML += item;
            });
            var item = '<div class="game new"><div class="game-picture"></div><div class="game-title">Ajouter</div><div class="game-release-year">un jeu</div></div>';
            list.innerHTML += item;
            document.querySelectorAll('.game:not(.new)').forEach(function (item, index) {
                item.addEventListener('click', function () {
                    _this._controllerStudios.editGame(parseInt(item.dataset.id));
                });
            });
            document.querySelector('.game.new').addEventListener('click', function () {
                _this._controllerStudios.createGame();
            });
        }
        else {
            list.innerHTML = '<div id="start">Sélectionnez un studio de développement</div>';
        }
    };
    /**
     * Displays dialog to edit a game
     */
    ViewStudios.prototype.displayEditGameDialog = function () {
        var _this = this;
        var game = this._controllerStudios.editedGame;
        if (game) {
            if (document.getElementById('dlg-edit-game') == null) {
                var dialogHTML = '<div id="dlg-edit-game" class="dialog-background">';
                dialogHTML += '<div class="dialog-window">';
                dialogHTML += '<div class="dialog-title">';
                dialogHTML += game.id == 0 ? 'Nouveau jeu' : 'Modification d\'un jeu';
                dialogHTML += '</div>';
                dialogHTML += '<div class="dialog-content">';
                dialogHTML += '<p><input type="text" id="txt-game-name" value="' + game.name + '" placeholder="Nom du jeu" /></p>';
                dialogHTML += '<p><input type="number" id="txt-game-release-year" value="' + game.releaseYear + '" placeholder="Année de sortie" /></p>';
                dialogHTML += '<div id="game-picture" style="background-image: url(' + game.picture + ');"></div>';
                dialogHTML += '<input type="file" id="brw-game-picture" accept="images/*" />';
                dialogHTML += '</div>';
                dialogHTML += '<div class="dialog-buttons">';
                if (game.id == 0) {
                    dialogHTML += '<div class="dialog-button" id="btn-add-game">Ajouter</div>';
                }
                else {
                    dialogHTML += '<div class="dialog-button" id="btn-update-game">Modifier</div>';
                    dialogHTML += '<div class="dialog-button" id="btn-remove-game">Supprimer</div>';
                }
                dialogHTML += '<div class="dialog-button" id="btn-cancel-edit-game">Annuler</div>';
                dialogHTML += '</div>';
                dialogHTML += '</div>';
                dialogHTML += '</div>';
                document.body.innerHTML += dialogHTML;
                if (game.id == 0) {
                    document.getElementById('btn-add-game').addEventListener('click', function () { _this._controllerStudios.saveGame(_this.getGameData()); });
                }
                else {
                    document.getElementById('btn-update-game').addEventListener('click', function () { _this._controllerStudios.saveGame(_this.getGameData()); });
                    document.getElementById('btn-remove-game').addEventListener('click', function () { _this._controllerStudios.removeGame(); });
                }
                document.getElementById('btn-cancel-edit-game').addEventListener('click', function () { _this._controllerStudios.cancelEditGame(); });
                document.getElementById('game-picture').addEventListener('click', function () {
                    document.getElementById('brw-game-picture').click();
                });
                document.getElementById('brw-game-picture').addEventListener('change', function () {
                    var files = document.getElementById('brw-game-picture').files;
                    if (files.length) {
                        var file = files[0];
                        var reader_1 = new FileReader();
                        reader_1.onload = function () {
                            document.getElementById('game-picture').style.backgroundImage = 'url(' + reader_1.result + ')';
                            document.getElementById('game-picture').dataset.picture = reader_1.result.toString();
                        };
                        reader_1.readAsDataURL(file);
                    }
                });
            }
        }
        else if (document.getElementById('dlg-edit-game')) {
            document.getElementById('dlg-edit-game').remove();
        }
    };
    /**
     * Returns game data inputed by user
     */
    ViewStudios.prototype.getGameData = function () {
        return {
            name: document.getElementById('txt-game-name').value,
            releaseYear: document.getElementById('txt-game-release-year').value,
            picture: document.getElementById('game-picture').dataset.picture
        };
    };
    return ViewStudios;
}());
//# sourceMappingURL=view-studios.js.map