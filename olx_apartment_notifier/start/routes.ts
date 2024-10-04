/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthLoginController from '#controllers/auth_login_controller'
import router from '@adonisjs/core/services/router'


router.get('', [AuthLoginController, 'showInitialView'])

router.get('/login', [AuthLoginController, 'showLoginView'])
router.post('/login', [AuthLoginController, 'login'])

router.get('/registration', [AuthLoginController, 'showRegistrationView'])
router.post('/registration', [AuthLoginController, 'register'])