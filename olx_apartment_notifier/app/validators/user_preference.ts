import { isNan } from '@sindresorhus/is'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

async function isCommaSeparatedStringHasOnlyNumbers(value: unknown, _options: any, field: FieldContext) {
    if(typeof value !== 'string') {
        return
    }

    const substrings = value.split(',')

    substrings.forEach((substring) => {
        const number = parseInt(substring, 10)
        if(isNan(number) || !Number.isInteger(number)) {
            field.report(`The ${field.name} field must contains only integer numbers`, 'notIntegers', field)
        }
    })
}

const integersInStringRule = vine.createRule(isCommaSeparatedStringHasOnlyNumbers)

export const userPreferencesValidator = vine.compile(
    vine.object({
        rooms: vine.string().use(integersInStringRule()).optional(),
        floor: vine.string().use(integersInStringRule()).optional()
    })
)
    