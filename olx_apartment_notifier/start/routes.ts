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


router.get('', [AuthLoginController, 'getInitialView'])

router.get('/login', [AuthLoginController, 'getLoginView'])
router.post('/login', [AuthLoginController, 'login'])

router.get('/registration', [UsersController, 'getRegistrationView'])
router.post('/registration', [UsersController, 'create'])

router.get('/home', [UserPreferencesController, 'getHomeViewAndUserPreferences'])
router.get('/home/profile', [UsersController, 'showUser'])

router.post('/home/profile', [UsersController, 'update'])
router.get('/home/profile/delete', [UsersController, 'destroy'])
router.get('/home/profile/logout', [AuthLoginController, 'logout'])

router.get('/home/create-preference', [UserPreferencesController, 'getCreatePreferenceView'])
router.get('/home/update-preference/:userPreferenceId', [UserPreferencesController, 'getUpdatePreferenceView'])

router.post('/home/create-preference', [UserPreferencesController, 'storePreference'])
router.post('/home/update-preference/:userPreferenceId', [UserPreferencesController, 'updatePreference'])

router.get('/home/delete-preference/:userPreferenceId', [UserPreferencesController, 'destroyPreference'])


router.get('/cities-by-region/:regionId', [UserPreferencesController, 'getCitiesByRegion'])
router.get('/districts-by-city/:cityId', [UserPreferencesController, 'getDistrictsByCity'])
router.get('/selected-building-types-in-user-preference/:userPreferenceId', [UserPreferencesController, 'getSelectedBuildingTypesInPreference'])
