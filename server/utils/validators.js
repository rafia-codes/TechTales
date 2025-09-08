const Joi=require('joi');

module.exports.UserValidation=Joi.object({
        email:Joi.string().email().required().messages({
            'any.required':"Email is required",
            'string.empty':"Email is required",
            'string.email':"Email is of invalid pattern"
        }),
        password:Joi.when('authProvider',{
            is:'local',
            then:Joi.string()
                //.min(8).max(20)
                //.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'))
                .messages({
                    'any.required':'Password is required',
                    'string.empty':'Password is required',
                    'string.min':'Password must be 8 characters long',
                    'string.max':'Password must not exceed 30 characters',
                    'string.pattern.base':'Password must include uppercase, lowercase, number, and special character',
                }),
            otherwise:Joi.forbidden()
        }),
        profilepic:Joi.string().uri().optional().messages({
            'string.uri':'Invalid url'
        }),
        displayName:Joi.string().required().messages({
            'string.empty':'Enter name to be displayed',
            'any.required':'Display Name cannot be empty'
        }),
        authProvider:Joi.string().valid('local','google','linkedin','twitter','github').default('local'),
        isEmailVerified:Joi.boolean().default(false),
        phone:Joi.string().pattern(/^[0-9]{10,15}$/).message('Phone no invalid format'),
        social_links:Joi.object({
        insta:Joi.string(),
        youtube:Joi.string(),
        twitter:Joi.string(),
        github:Joi.string()
    })
})

module.exports.BlogValidation=Joi.object({
    blog:Joi.object({
        title:Joi.string().min(3).max(100).required(),
        content:Joi.string().min(200).required(),
        author:Joi.string().required()
    })
})