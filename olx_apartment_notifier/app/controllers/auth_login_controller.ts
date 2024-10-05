import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthLoginController {
    async showInitialView({view}: HttpContext) {
        return view.render('initial_view')
    }

    async showLoginView({view}: HttpContext) {
        return view.render('login_view')
    }

    async login({request, auth, session, response}: HttpContext) {
        const {email, password} = request.only(['email', 'password'])

        try {
            const user = await User.verifyCredentials(email, password)
            await auth.use().login(user)
            return response.redirect('/home')   // HOME PAGE
        } catch (error) {
            session.flash('error', 'Invalid email or password')
            return response.redirect().back()
        }
    }

    async showRegistrationView({view}: HttpContext) {
        return view.render('registration_view')
    }

    async register({request, response}: HttpContext) {
        const inputData = await createUserValidator.validate(request.all())
        await User.create(inputData)
        return response.redirect('/home')       // HOME PAGE
    }


    //////////////////////////


    async showHomeView({view}: HttpContext) {
        return view.render('home_view')
    }

    async showUserProfileView({auth, view}: HttpContext) {
        const user = await auth.use().authenticate()
        return view.render('user_profile_view', {user})
    }
}