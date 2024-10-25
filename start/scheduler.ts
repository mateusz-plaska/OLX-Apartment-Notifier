
import AdvertismentPreferenceComparingService from '#services/advertisment_preference_comparing_service';
import AdvertismentsHandlingService from '#services/advertisments_handling_service';
import EmailSendingService from '#services/email_sending_service';
import scheduler from 'adonisjs-scheduler/services/main'


const advertismentsHandlingService = new AdvertismentsHandlingService()
const advertismentPreferenceComparingService = new AdvertismentPreferenceComparingService()
const emailSendingService = new EmailSendingService()

scheduler.call(async () => {
    await advertismentsHandlingService.handleAdvertisments(advertismentPreferenceComparingService, emailSendingService)
}).everyTenMinutes()

//.everyHours(12)