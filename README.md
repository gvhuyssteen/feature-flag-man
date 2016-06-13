## Feature Flag Man API (WIP)

This is still a work in progress and not all features are ready.

### Description

A feature flag manager where developers can easily toggle features in their applications



### Goal

Create an API to CRUD and toggle feature flags for developers to use in their applications.



### MVP

#### Installation

```
Remember to create the following databases
 - api_keys
 - flags
```

#### Authentication

Any developer using this service should have an API key to authenticate themselves with every request that they make.

    Register:
    POST /auth {'full_name', 'email', 'password'}
    
    Forget Password:
    POST /auth/reset {'email'}
    
    Login:
    POST /auth/login {'email', 'password'}
    RETURN {'auth-key'}
    

#### CRUD API Keys

To create an API key, call the API with an authentication key to generate an API Key.
The API will send the developer an email with new API keys.

    Create API Key:
    POST /api-key {'auth-key'}

Reading API keys will return all API keys with their hashed IDs associated with the authentication key.

    List API Keys:
    GET /api-key {'auth-key'}
    RETURN [{'hash-id', 'api-key'}]

Updating API keys are forbidden and not allowed.

    No routes should be created here

To delete an API key, we need a valid authentication key and API key hash to delete the API key.

    Delete API Key:
    POST /api-key/delete {'auth-key', 'hash-id'}


#### CRUD Flags

A flag can be created, read and deleted whenever necessary.

    Create flag:
    POST /flag {'api-key', 'flag-name', 'status'}
    
    Index flags:
    GET /flag {'api-key'}
    RETURN [{'flag-name', 'status'}]
    
    Delete flag:
    POST /flag/{flag-name} {'api-key'}
    

#### Toggle Flag

Enable or disable a flag by calling the API with API key, flag name and boolean value of the flag.

    Toggle flag:
    POST /flag/toggle/{flag-name} {'api-key', 'status'}

#### Flag Status Check

Most important part of this product is the ability to check the status of the flag.
Call the API with API key and flag name to check the status of a feature flag.

    Check flag:
    GET /flag/check/{flag-name} {'api-key'}
    