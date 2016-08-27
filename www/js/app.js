window.globalVariable = {

    color: {
        appPrimaryColor: "",
        dropboxColor: "#017EE6",
        facebookColor: "#3C5C99",
        foursquareColor: "#F94777",
        googlePlusColor: "#D73D32",
        instagramColor: "#517FA4",
        wordpressColor: "#0087BE"
    },
    startPage: {
        url: "/app/account",
        state: "app.account"
    },
    message: {
        errorMessage: "Technical error please try again later."
    },
    oAuth: {
      facebook: "",
    }
};


angular.module('starter', ['ionic','ngIOS9UIWebViewPatch', 'starter.controllers', 'starter.services', 'ngMaterial', 'ngMessages', 'ngCordova'])
    .run(function ($ionicPlatform, $cordovaSQLite, $rootScope, $ionicHistory, $state, $mdDialog, $mdBottomSheet) {

        function getDefaultStyle() {
            return "" +
                ".material-background-nav-bar { " +
                "   background-color        : " + appPrimaryColor + " !important; " +
                "   border-style            : none;" +
                "}" +
                ".md-primary-color {" +
                "   color                     : " + appPrimaryColor + " !important;" +
                "}";
        }

        function initialRootScope() {
            $rootScope.appPrimaryColor = appPrimaryColor;
            $rootScope.isAndroid = ionic.Platform.isAndroid();
            $rootScope.isIOS = ionic.Platform.isIOS();
        };

        function hideActionControl() {
            
            $mdBottomSheet.cancel();
            $mdDialog.cancel();
        };

        function createCustomStyle(stateName) {
            var customStyle =
                ".material-background {" +
                "   background-color          : " + appPrimaryColor + " !important;" +
                "   border-style              : none;" +
                "}" +
                ".spinner-android {" +
                "   stroke                    : " + appPrimaryColor + " !important;" +
                "}";


            customStyle += getDefaultStyle();

            return customStyle;
        }

        $rootScope.customStyle = createCustomStyle(window.globalVariable.startPage.state);

        $ionicPlatform.ready(function () {
            ionic.Platform.isFullScreen = true;
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            initialRootScope();

            
            $rootScope.$on('$ionicView.beforeEnter', function () {
                
                hideActionControl();

                $rootScope.customStyle = createCustomStyle($ionicHistory.currentStateName());
            });
        });

    })

    .config(function ($ionicConfigProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider, $mdColorPalette, $mdIconProvider) {

        $ionicConfigProvider.spinner.icon("android");
        $ionicConfigProvider.views.swipeBackEnabled(false);

        $mdIconProvider
            .icon('facebook', 'img/icons/facebook.svg')
            .icon('twitter', 'img/icons/twitter.svg')
            .icon('mail', 'img/icons/mail.svg')
            .icon('message', 'img/icons/message.svg')
            .icon('share-arrow', 'img/icons/share-arrow.svg')
            .icon('more', 'img/icons/more_vert.svg');

        $mdThemingProvider
            .theme('default')
            .primaryPalette('green')
            .accentPalette('teal');

        appPrimaryColor = $mdColorPalette[$mdThemingProvider._THEMES.default.colors.primary.name]["500"];

        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu/html/menu.html",
                controller: 'menuCtrl'
            })
            .state('app.account', {
                url: "/account",
                views: {
                    'menuContent': {
                        templateUrl: "templates/account/html/account.html",
                        controller: 'accountCtrl'
                    }
                }
            });
            
        $urlRouterProvider.otherwise(window.globalVariable.startPage.url);

    });