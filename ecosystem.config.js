module.exports = {
    apps: [
        {
            name: "MsApp",
            script: "./dist/apps/ms-app/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod"
            }
        },
        {
            name: "MsAsset",
            script: "./dist/apps/ms-asset/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "MsAuth",
            script: "./dist/apps/ms-auth/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 2,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "MsChannel",
            script: "./dist/apps/ms-channel/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "MsLocationUnit",
            script: "./dist/apps/ms-location-unit/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "MsContract",
            script: "./dist/apps/ms-contract/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "MsMail",
            script: "./dist/apps/ms-mail/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "MsDecision",
            script: "./dist/apps/ms-decision/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "MsMessage",
            script: "./dist/apps/ms-message/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "MsNotification",
            script: "./dist/apps/ms-notification/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "MsOrganization",
            script: "./dist/apps/ms-organization/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "MsPartner",
            script: "./dist/apps/ms-partner/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "MsQueue",
            script: "./dist/apps/ms-queue/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "MsSharedDirectory",
            script: "./dist/apps/ms-shared-directory/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "MsSetting",
            script: "./dist/apps/ms-setting/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "MsSite",
            script: "./dist/apps/ms-site/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 2,
            env: {
                "NODE_ENV": "prod",
                //"NODE_OPTIONS": "--max-old-space-size=8192"
            }
        },
        {
            name: "MsSiteCost",
            script: "./dist/apps/ms-site-cost/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 2,
            env: {
                "NODE_ENV": "prod",
                //"NODE_OPTIONS": "--max-old-space-size=8192"
            }
        },
        {
            name: "MsSiteTraffic",
            script: "./dist/apps/ms-site-traffic/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
                //"NODE_OPTIONS": "--max-old-space-size=8192"
            }
        },
        {
            name: "MsSiteLog",
            script: "./dist/apps/ms-site-log/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
                //"NODE_OPTIONS": "--max-old-space-size=8192"
            }
        },
        {
            name: "MsSocket",
            script: "./dist/apps/ms-socket/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
                //"NODE_OPTIONS": "--max-old-space-size=8192"
            }
        },
        {
            name: "MsStorage",
            script: "./dist/apps/ms-storage/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
                //"NODE_OPTIONS": "--max-old-space-size=8192"
            }
        },
        {
            name: "MsSync",
            script: "./dist/apps/ms-sync/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
                //"NODE_OPTIONS": "--max-old-space-size=8192"
            }
        },
        {
            name: "MsVcContract",
            script: "./dist/apps/ms-vc-contract/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
                //"NODE_OPTIONS": "--max-old-space-size=8192"
            }
        },
        {
            name: "MsVcContractAcceptance",
            script: "./dist/apps/ms-vc-contract-acceptance/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
                //"NODE_OPTIONS": "--max-old-space-size=8192"
            }
        },
        {
            name: "MsVcPayment",
            script: "./dist/apps/ms-vc-payment/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
                //"NODE_OPTIONS": "--max-old-space-size=8192"
            }
        },
        {
            name: "MsVcPlan",
            script: "./dist/apps/ms-vc-plan/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
                //"NODE_OPTIONS": "--max-old-space-size=8192"
            }
        },
        {
            name: "MsVcProject",
            script: "./dist/apps/ms-vc-project/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "MsVcSurvey",
            script: "./dist/apps/ms-vc-survey/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "ChannelGateway",
            script: "./dist/apps/vms-channel-gateway/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "DashboardGateway",
            script: "./dist/apps/vms-dashboard-api/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
                "NODE_OPTIONS": "--max-old-space-size=8192"
            }
        },
        {
            name: "GponGateway",
            script: "./dist/apps/vms-gpon-gateway/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 4,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "AdminGateway",
            script: "./dist/apps/admin-gateway/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 2,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "FuelCostGateway",
            script: "./dist/apps/vms-fuelcost/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "IpmGateway",
            script: "./dist/apps/vms-ipm-gateway/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
        {
            name: "VcGateway",
            script: "./dist/apps/vms-vc-gateway/main.js",
            watch: true,
            exec_mode: 'cluster',
            instances: 1,
            env: {
                "NODE_ENV": "prod",
            }
        },
    ]
}