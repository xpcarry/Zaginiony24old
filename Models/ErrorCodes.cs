namespace Zaginiony24.Models
{
    public class ErrorCodes
    {
        public const string InternalServiceError = "40000";
        public const string NoAccess = "40001";
        public const string BadRequest = "40002";

        public const string EmailIsIncorrect = "42000";
        public const string InvalidUserName = "42001";
        public const string UserAlreadyExist = "42002";
        public static string InvalidUsernameOrPassword = "42003";
        public static string OldPasswordIncorrect = "42004";
        public static string InvalidPasswordResetCode = "42005";
        public static string AccountTypeIsEmpty = "42006";
        public static string MissingApiKey = "42007";
        public static string InvalidToken = "42008";
        public static string InvalidPaymentCode = "42009";
        public static string PasswordPolicyMissmatch= "42010";
        public static string InvalidIntegration = "42011";
        public static string UserWithThisEmailAlreadyExists = "42012";
        public static string UserWithThisUsernameAlreadyExists = "42013";
        public static string PasswordDoNotMatch = "42014";

        public static string CannotFindAnyNotice = "43001";
        public static string InvalidNoticeId = "43002";
    }
}
