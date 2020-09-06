export = {
    'discoverySucceeded': {
        "event": {
            "header": {
                "messageId": "id1",
                "name": "Discover.Response",
                "namespace": "Alexa.Discovery",
                "payloadVersion": "3"
            },
            "payload": {
                "endpoints": [
                    {
                        "capabilities": [
                            {
                                "interface": "Alexa.BrightnessController",
                                "properties": {
                                    "proactivelyReported": false,
                                    "retrievable": false,
                                    "supported": [{
                                        "name": "brightness"
                                    }]
                                },
                                "type": "AlexaInterface",
                                "version": "3"
                            },
                            {
                                "interface": "Alexa.PowerController",
                                "properties": {
                                    "proactivelyReported": false,
                                    "retrievable": false,
                                    "supported": [{
                                        "name": "powerState"
                                    }]
                                },
                                "type": "AlexaInterface",
                                "version": "3"
                            },
                            {
                                "capabilityResources": {
                                    "friendlyNames": [
                                        {
                                            "@type": "text",
                                            "value": {
                                                "locale": "ja-JP",
                                                "text": "ファン"
                                            }
                                        }
                                    ]
                                },
                                "instance": "LightFan.switch",
                                "interface": "Alexa.ToggleController",
                                "properties": {
                                    "proactivelyReported": false,
                                    "retrievable": false,
                                    "supported": [
                                        {
                                            "name": "toggleState",
                                        }
                                    ]
                                },
                                "semantics": {
                                    "actionMappings": [
                                        {
                                            "@type": "ActionsToDirective",
                                            "actions": [
                                                "Alexa.Actions.Close"
                                            ],
                                            "directive": {
                                                "name": "TurnOff",
                                                "payload": {}
                                            }
                                        },
                                        {
                                            "@type": "ActionsToDirective",
                                            "actions": [
                                                "Alexa.Actions.Open"
                                            ],
                                            "directive": {
                                                "name": "TurnOn",
                                                "payload": {}
                                            }
                                        }
                                    ],
                                    "stateMappings": [
                                        {
                                            "@type": "StatesToValue",
                                            "states": [
                                                "Alexa.States.Closed"
                                            ],
                                            "value": "OFF"
                                        },
                                        {
                                            "@type": "StatesToValue",
                                            "states": [
                                                "Alexa.States.Open"
                                            ],
                                            "value": "ON"
                                        }
                                    ]
                                },
                                "type": "AlexaInterface",
                                "version": "3"
                            }
                        ],
                        "cookie": {
                        "hoge": "hoge"
                        },
                        "description": "manu",
                        "displayCategories": [
                            "LIGHT"
                        ],
                        "endpointId": "1",
                        "friendlyName": "fname",
                        "manufacturerName": "manu"
                    }
                ]
            }
        }
    },
    'controllerNoOperation': {
        "event": {
        "endpoint": {
            "endpointId": "1"
        },
        "header": {
            "correlationToken": "cotoken",
            "messageId": "id1-R",
            "name": "ErrorResponse",
            "namespace": "Alexa",
            "payloadVersion": "3"
        },
        "payload": {
            "message": "This operation is not supported.",
            "type": "NOT_IN_OPERATION"
        }
        }
    },
    'controllerAdjustBrightness': {
        "event":{
           "header":{
              "namespace":"Alexa",
              "name":"Response",
              "messageId":"id1-R",
              "payloadVersion":"3",
              "correlationToken":"cotoken"
           },
           "endpoint":{
              "endpointId":"1"
           },
           "payload":{
              
           }
        },
        "context":{
           "properties":[
              {
                 "namespace":"Alexa.BrightnessController",
                 "name":"brightness",
                 "value":10,
                 "timeOfSample":"time",
                 "uncertaintyInMilliseconds":1000
              }
           ]
        }
     },
     'discoverySucceededWithSearchFunction': {
        "event": {
            "header":{
                "namespace":"Alexa.Discovery",
                "name":"Discover.Response",
                "payloadVersion":"3",
                "messageId":"id1"
            },
            "payload": {
                "endpoints":[
                    {
                        "endpointId":"1",
                        "manufacturerName":"manufacture1",
                        "description":"desc1",
                        "friendlyName":"device1",
                        "displayCategories":[
                            "LIGHT"
                        ],
                        "capabilities":[
                            {
                            "type":"AlexaInterface",
                            "version":"3",
                            "interface":"Alexa.BrightnessController",
                            "properties":{
                                "supported":[
                                    {
                                        "name":"brightness"
                                    }
                                ],
                                "proactivelyReported":false,
                                "retrievable":false
                            }
                            }
                        ],
                        "cookie":{
                            
                        }
                    }
                ]
            }
        }
    }
}