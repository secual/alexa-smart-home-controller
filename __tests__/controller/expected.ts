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
    'controllerSucceeded': {
        "context": {
        "properties": []
        },
        "event": {
        "endpoint": {
            "endpointId": "1"
        },
        "header": {
            "correlationToken": "cotoken",
            "messageId": "id1-R",
            "name": "Response",
            "namespace": "Alexa",
            "payloadVersion": "3"
        },
        "payload": {}
        }
    }
}