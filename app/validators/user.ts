import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
    vine.object({
        fullName: vine.string().maxLength(255),
        email: vine.string().email().unique(async (db, value) => !(await db.from('users').where('email', value).first())),
        password: vine.string().minLength(8)
    })
)

export const updateUserValidator = (userId: number) => {
    return vine.compile(
        vine.object({
            fullName: vine.string().maxLength(255),
            email: vine.string().email()
                .unique(async (db, value) => !(await db.from('users').where('email', value).whereNot('id', userId).first())),
            password: vine.string().minLength(8).optional()
        })
    )
}


