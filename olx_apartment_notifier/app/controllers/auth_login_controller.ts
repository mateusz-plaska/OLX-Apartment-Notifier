import User from '#models/user'
import UserPreference from '#models/user_preference'
import { createUserValidator, updateUserValidator } from '#validators/user'
import auth from '@adonisjs/auth/services/main'
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
            return response.redirect('/home')   
        } catch (error) {
            session.flash('error', 'Invalid email or password')
            return response.redirect().back()
        }
    }

    async showRegistrationView({view}: HttpContext) {
        return view.render('registration_view')
    }

    async register({request, auth, response}: HttpContext) {
        const inputData = await createUserValidator.validate(request.all())
        const user = await User.create(inputData)
        await auth.use().login(user)
        return response.redirect('/home')   
    }


    async updateUserData({auth, request, response}: HttpContext) {
        const user = await auth.use().authenticate()
        const inputData = await updateUserValidator(user.id).validate(request.all())
        
        user.merge(inputData).save()
        return response.redirect().back()
    }

    async deleteUser({auth, response}: HttpContext) {
        const user = await auth.use().authenticate()
        await user.delete()
        return response.redirect('/')
    }

    async logout({auth, response}: HttpContext) {
        await auth.use().logout()
        return response.redirect('/')
    }

    //////////////////////////


    async showHomeView({auth, request, view}: HttpContext) {
        const user = await auth.use().authenticate()

        const userPreferences = await UserPreference.query().where('user_id', user.id).paginate(
            request.input('page', 1),
            request.input('perPage', 5)
        )

        return view.render('home_view', {userPreferences})
    }

    async showUserProfileView({auth, view}: HttpContext) {
        const user = await auth.use().authenticate()
        return view.render('user_profile_view', {user})
    }
}