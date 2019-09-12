using FluentValidation;

namespace Application.Validators
{
    public static class ValidatortExtensions
    {
        public static IRuleBuilder<T,string> Password<T>(this IRuleBuilder<T,string> ruleBuilder)
        {
            var options = ruleBuilder
            .NotEmpty()
            .MinimumLength(6).WithMessage("Password must be at least 6 chararters")
            .Matches("[A-Z]").WithMessage("Password must contain 1 uppercase letter")
            .Matches("[a-z]").WithMessage("Password must at least contion 1 lowercase letter")
            .Matches("[0-9]").WithMessage("Password must contaion a number")
            .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain at least 1 non alphanumeric");

            return options;
        }
    }
}