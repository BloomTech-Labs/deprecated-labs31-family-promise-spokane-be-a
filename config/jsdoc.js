module.exports = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Family Promise Of Spokane Intake Form API',
      version: '1.0.0',
      description:
        'API endpoint documentation for back-end server of application',
      license: {
        name: 'MIT',
        url: 'https://en.wikipedia.org/wiki/MIT_License',
      },
    },
    tags: [
      {
        name: 'status',
        description: 'Everything about your status',
      },
      {
        name: 'User',
        description: 'Operations for users',
      },
      {
        name: 'Families',
        description: 'Operations for families',
      },
      {
        name: 'Members',
        description: 'Operations for members',
      },
      {
        name: 'Notes',
        description: 'Operations for notes',
      },
      {
        name: 'Logs',
        description: 'Operations for logs',
      },
    ],
    components: {
      securitySchemes: {
        okta: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'Okta idToken JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
        BadRequest: {
          description: 'Bad request. user already exists',
        },
        NotFound: {
          description: 'Not Found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'A message about the result',
                    example: 'Not Found',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./api/**/*Router.js'],
};
