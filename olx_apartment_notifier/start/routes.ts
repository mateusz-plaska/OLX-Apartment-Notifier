/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthLoginController from '#controllers/auth_login_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'


router.get('', [AuthLoginController, 'getInitialView'])

router.get('/login', [AuthLoginController, 'getLoginView'])
router.post('/login', [AuthLoginController, 'login'])

router.get('/registration', [UsersController, 'getRegistrationView'])
router.post('/registration', [UsersController, 'create'])

router.get('/home', [AuthLoginController, 'showHomeView'])
router.get('/home/profile', [UsersController, 'showUser'])

router.post('/home/profile', [UsersController, 'update'])
router.get('/home/profile/delete', [UsersController, 'destroy'])
router.get('/home/profile/logout', [AuthLoginController, 'logout'])