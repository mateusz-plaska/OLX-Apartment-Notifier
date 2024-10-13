import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

async function isCommaSeparatedStringHasOnlyNumbers(value: unknown, _options: any, field: FieldContext) {
    if(typeof value !== 'string') {
        return
    }

    if(!/^[0-9,]*$/.test(value)) {
        field.report(`The ${field.name} field must contains only integer numbers`, 'notIntegers', field)
    }
}

const integersInStringRule = vine.createRule(isCommaSeparatedStringHasOnlyNumbers)

export const userPreferencesValidator = vine.compile(
    vine.object({
        rooms: vine.string().use(integersInStringRule()).optional(),
        floor: vine.string().use(integersInStringRule()).optional()
    })
)
    