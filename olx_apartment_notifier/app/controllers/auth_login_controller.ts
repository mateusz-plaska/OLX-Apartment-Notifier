import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthLoginController {
    async getInitialView({view}: HttpContext) {
        return view.render('app_views/initial_view')
    }

    async getLoginView({view}: HttpContext) {
        return view.render('app_views/login_view')
    }

    async login({request, auth, session, response}: HttpContext) {
        const {email, password} = request.only(['email', 'password'])

        try {
            const user = await User.verifyCredentials(email, password)
            await auth.use().login(user)
            return response.redirect('/home')   
        } catch (error) {
            session.flash('error', 'Invalid email or password')
            return response.redirect().back()
        }
    }

    async logout({auth, response}: HttpContext) {
        await auth.use().logout()
        return response.redirect('/')
    }
}