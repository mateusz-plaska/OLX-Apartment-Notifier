/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthLoginController from '#controllers/auth_login_controller'
import UserPreferencesController from '#controllers/user_preferences_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import { throttleRequestsAuth } from './limiter.js'
import LocationsController from '#controllers/locations_controller'


router.get('', [AuthLoginController, 'getInitialView'])

router.get('/login', [AuthLoginController, 'getLoginView'])
router.post('/login', [AuthLoginController, 'login']).use(throttleRequestsAuth)

router.get('/registration', [UsersController, 'getRegistrationView'])
router.post('/registration', [UsersController, 'create']).use(throttleRequestsAuth)

router.group(() => {
    router.get('', [UserPreferencesController, 'getHomeViewAndUserPreferences'])

    router.group(() => {
        router.get('', [UsersController, 'showUser'])
        router.post('', [UsersController, 'update'])
        router.get('/delete', [UsersController, 'destroy'])
        router.get('/logout', [AuthLoginController, 'logout'])
    }).prefix('/profile')
    
    router.get('/create-preference', [UserPreferencesController, 'getCreatePreferenceView'])
    router.post('/create-preference', [UserPreferencesController, 'storePreference'])
    
    router.get('/update-preference/:userPreferenceId', [UserPreferencesController, 'getUpdatePreferenceView']).where('userPreferenceId', /^[0-9]+$/)
    router.post('/update-preference/:userPreferenceId', [UserPreferencesController, 'updatePreference']).where('userPreferenceId', /^[0-9]+$/)

    router.get('/delete-preference/:userPreferenceId', [UserPreferencesController, 'destroyPreference']).where('userPreferenceId', /^[0-9]+$/)

}).prefix('/home').use(middleware.auth())


router.get('/cities-by-region/:regionId', [LocationsController, 'getCitiesByRegion']).where('regionId', /^[0-9]+$/)
router.get('/districts-by-city/:cityId', [LocationsController, 'getDistrictsByCity']).where('cityId', /^[0-9]+$/)
router.get('/selected-building-types-in-user-preference/:userPreferenceId', 
                [LocationsController, 'getSelectedBuildingTypesInPreference']).where('userPreferenceId', /^[0-9]+$/)
