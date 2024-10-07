import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
    async getRegistrationView({view}: HttpContext) {
        return view.render('registration_view')
    }

    async showUser({auth, view}: HttpContext) {
        const user = await auth.use().authenticate()
        return view.render('user_profile_view', {user})
    }

    async create({request, auth, response}: HttpContext) {
        const inputData = await createUserValidator.validate(request.all())
        const user = await User.create(inputData)
        await auth.use().login(user)
        return response.redirect('/home')   
    }

    async update({auth, request, response}: HttpContext) {
        const user = await auth.use().authenticate()
        const inputData = await updateUserValidator(user.id).validate(request.all())
        
        user.merge(inputData).save()
        return response.redirect().back()
    }

    async destroy({auth, response}: HttpContext) {
        const user = await auth.use().authenticate()
        await user.delete()
        return response.redirect('/')
    }
}