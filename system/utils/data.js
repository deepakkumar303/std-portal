const utilsChecks = require('./checks');

const getEmailTemplate = async(service, action) => {
    const EmailTemplateDetails = {
        CORPORATE: {
            NOTIFICATION_THAT_CORPORATE_HAS_SUBMITTED_APPLICATION_FOR_REVIEW: {
                name: 'NOTIFICATION_THAT_CORPORATE_HAS_SUBMITTED_APPLICATION_FOR_REVIEW',
                active: true,
            },
            ON_SUCCESSFUL_CORPORATE_APPLICATION: {
                name: 'ON_SUCCESSFUL_CORPORATE_APPLICATION',
                active: true,
            },
            APPROVING_CORPORATES_APPLICATION_TO_BECOME_ZAVEN_MEMBER: {
                name: 'APPROVING_CORPORATES_APPLICATION_TO_BECOME_ZAVEN_MEMBER',
                active: true,
            },
            REJECTION_OF_SIGN_UP_APPLICATION: {
                name: 'REJECTION_OF_SIGN_UP_APPLICATION',
                active: true,
            },
            REQUEST_FOR_ADDITIONAL_MISSING_INFO: {
                name: 'REQUEST_FOR_ADDITIONAL_MISSING_INFO',
                active: true,
            },
            ON_ADDING_A_NEW_USER_TO_CORPORATE_FROM_DASHBOARD: {
                name: 'ON_ADDING_A_NEW_USER_TO_CORPORATE_FROM_DASHBOARD',
                active: true,
            },
            REQUEST_FOR_SUPPORT_FROM_ZA_LS: {
                name: 'REQUEST_FOR_SUPPORT_FROM_ZA_LS',
                active: true,
            },
        },
        LEGAL_SERVICE: {
            ON_INVITING_LSP_TO_SIGN_UP: {
                name: 'ON_INVITING_LSP_TO_SIGN_UP',
                active: true,
            },
            ON_LS_SUCCESSFULLY_SIGNING_UP: {
                name: 'ON_LS_SUCCESSFULLY_SIGNING_UP',
                active: true,
            },
            NOTIFICATION_TO_ZA_THAT_LSP_HAS_SUBMITTED_APPLICATION: {
                name: 'NOTIFICATION_TO_ZA_THAT_LSP_HAS_SUBMITTED_APPLICATION',
                active: true,
            },
            APPROVING_LSP_APPLICATION_TO_BECOME_ZAVEN_MEMBER: {
                name: 'APPROVING_LSP_APPLICATION_TO_BECOME_ZAVEN_MEMBER',
                active: true,
            },
            ON_ZA_REJECTING_THE_SIGN_UP_APPLICATION: {
                name: 'ON_ZA_REJECTING_THE_SIGN_UP_APPLICATION',
                active: true,
            },
            LS_TO_REQUEST_MORE_INFORMATION: {
                name: 'LS_TO_REQUEST_MORE_INFORMATION',
                active: true,
            },
            ON_ADDING_A_NEW_USER_TO_LS_FROM_DASHBOARD: {
                name: 'ON_ADDING_A_NEW_USER_TO_LS_FROM_DASHBOARD',
                active: true,
            },
            REQUEST_FOR_SUPPORT_FROM_ZA_LS: {
                name: 'REQUEST_FOR_SUPPORT_FROM_ZA_LS',
                active: true,
            },
        },
        RFP: {
            RFP_PROPOSAL_INVITATION: {
                name: 'RFP_PROPOSAL_INVITATION',
                active: true,
            },
            RFP_HAS_BEEN_SUCCESSFULLY_SUBMITTED_TO_INVITED_BIDDERS: {
                name: 'RFP_HAS_BEEN_SUCCESSFULLY_SUBMITTED_TO_INVITED_BIDDERS',
                active: true,
            },
            CU_SUBMITTING_AMENDED_RFP_TO_INVITED_BIDDERS: {
                name: 'CU_SUBMITTING_AMENDED_RFP_TO_INVITED_BIDDERS',
                active: true,
            },
            CONFIRMATION_THAT_ALL_BIDS_HAVE_BEEN_SUCCESSFULLY_SUBMITTED: {
                name: 'CONFIRMATION_THAT_ALL_BIDS_HAVE_BEEN_SUCCESSFULLY_SUBMITTED',
                active: true,
            },
            ON_BEING_INVITED_BY_CORPORATE_TO_BID_FOR_A_SPECIFIC_RFP_ON_RFP_SUBMIT: {
                name: 'ON_BEING_INVITED_BY_CORPORATE_TO_BID_FOR_A_SPECIFIC_RFP_ON_RFP_SUBMIT',
                active: true,
            },
            ON_BEING_INVITED_BY_CORPORATE_TO_BID_FOR_A_SPECIFIC_RFP_NOT_ACCREDITED: {
                name: 'ON_BEING_INVITED_BY_CORPORATE_TO_BID_FOR_A_SPECIFIC_RFP_NOT_ACCREDITED',
                active: true,
            },
            ON_BEING_INVITED_BY_CORPORATE_TO_BID_FOR_A_SPECIFIC_RFP_EXISTING_USER: {
                name: 'ON_BEING_INVITED_BY_CORPORATE_TO_BID_FOR_A_SPECIFIC_RFP_EXISTING_USER',
                active: true,
            },
            ON_BEING_INVITED_BY_CORPORATE_TO_BID_FOR_A_SPECIFIC_RFP_NON_EXISTING_USER: {
                name: 'ON_BEING_INVITED_BY_CORPORATE_TO_BID_FOR_A_SPECIFIC_RFP_NON_EXISTING_USER',
                active: true,
            },
            ON_BEING_INVITED_BY_CORPORATE_TO_BID_FOR_A_SPECIFIC_RFP_NOT_ACCREDITED_SECOND_AND_SUBSEQUENT: {
                name: 'ON_BEING_INVITED_BY_CORPORATE_TO_BID_FOR_A_SPECIFIC_RFP_NOT_ACCREDITED_SECOND_AND_SUBSEQUENT',
                active: true,
            },
            CU_ABORTED_RFP: {
                name: 'CU_ABORTED_RFP',
                active: true,
            },
        },
        PROPOSAL: {
            UPON_SUBMISSION_OF_FEE_PROPOSAL_ON_ZAVEN: {
                name: 'UPON_SUBMISSION_OF_FEE_PROPOSAL_ON_ZAVEN',
                active: true,
            },
            LSP_SELECTING_OPTION_TO_NOT_PARTICIPATE_AND_SUBMIT_PROPOSAL: {
                name: 'LSP_SELECTING_OPTION_TO_NOT_PARTICIPATE_AND_SUBMIT_PROPOSAL',
                active: true,
            },
            LSP_SELECTING_OPTION_TO_NOT_PARTICIPATE_BECAUSE_THEY_ARE_CONFLICTED: {
                name: 'LSP_SELECTING_OPTION_TO_NOT_PARTICIPATE_BECAUSE_THEY_ARE_CONFLICTED',
                active: true,
            },
            LSP_SELECTING_OPTION_TO_PROCEED_WITH_CREATING_A_PROPOSAL: {
                name: 'LSP_SELECTING_OPTION_TO_PROCEED_WITH_CREATING_A_PROPOSAL',
                active: true,
            },
            PROPOSAL_PRELIMINARY_INFO_PAGE_SUBMIT: {
                name: 'PROPOSAL_PRELIMINARY_INFO_PAGE_SUBMIT',
                active: true,
            },
            PROPOSAL_PRELIMINARY_INFO_PAGE_SUBMIT_WITH_OPTION_TO_NOT_PARTICIPATE: {
                name: 'PROPOSAL_PRELIMINARY_INFO_PAGE_SUBMIT_WITH_OPTION_TO_NOT_PARTICIPATE',
                active: true,
            },
            ON_LS_BEING_SELECTED_AS_WINNER_OF_RFP: {
                name: 'ON_LS_BEING_SELECTED_AS_WINNER_OF_RFP',
                active: true,
            },
            NOTIFYING_LOSING_LSP_ON_OUTCOME_OF_ITS_THEIR_PROPOSAL: {
                name: 'NOTIFYING_LOSING_LSP_ON_OUTCOME_OF_ITS_THEIR_PROPOSAL',
                active: true,
            },
            LSP_SELECTING_OPTION_TO_NOT_PARTICIPATE_BECAUSE_THEY_NEED_A_WAIVER_FROM_COUNTERPARTY: {
                name: 'LSP_SELECTING_OPTION_TO_NOT_PARTICIPATE_BECAUSE_THEY_NEED_A_WAIVER_FROM_COUNTERPARTY',
                active: true,
            },
        },
    };
    if (!utilsChecks.isEmptyString(service) && utilsChecks.isEmptyString(action)) {
        return EmailTemplateDetails[service];
    }
    if (!utilsChecks.isEmptyString(service) && !utilsChecks.isEmptyString(action)) {
        return EmailTemplateDetails[service][action];
    }
    return EmailTemplateDetails;
};

const lsSignupMaxFileUpload = () => (5);

const rfpMaxFileUpload = () => (5);

const getLegalServiceStatus = () => {
    const status = {
        InvitationSent: '5fc64e8dacf4da1c587b55fc',
        SubmitAsDraft: '5fc64ee0acf4da1c587b55fd',
        AwaitingResponse: '5fc64f0fdd6ef415e45ba14e',
        Accepted: '5fc64f19dd6ef415e45ba14f',
        Declined: '5fc64f22dd6ef415e45ba150',
    };
    return status;
};

const getRfpStatus = () => {
    const status = {
        Drafting: '5f97b1f83d428d09b09353ad',
        AwaitingBids: '5f97b20a3d428d09b09353ae',
        Aborted: '5f97b2113d428d09b09353af',
        Received: '5f97b2173d428d09b09353b0',
        Completed: '5f97b21d3d428d09b09353b1',
        Ended: '5fd326e47c688263daaa81c7',
    };
    return status;
};

const getProposalStatus = () => {
    const status = {
        AwaitingResponse: '5fc76d8b9c4e842ac0375f4a',
        Drafting: '5fc76da59c4e842ac0375f4b',
        Conflicted: '5fc76db09c4e842ac0375f4c',
        DidNotBid: '5fc76dc59c4e842ac0375f4d',
        SeekingApprovalForWaiver: '601ce79f585983c1ca234921',
        Submitted: '5fc76dd09c4e842ac0375f4e',
        Lost: '5fc76de19c4e842ac0375f4f',
        Won: '5fc76dea9c4e842ac0375f50',
        Aborted: '5fc76df49c4e842ac0375f51',
        Ended: '5fd327167c688263daaa81c8',
    };
    return status;
};

const getSowList = () => {
    const status = {
        CommercialContracts: '5f97b62a844b872dd039a412',
        Competition: '5f97b666844b872dd039a413',
        CorporateMA: '5f97b66e844b872dd039a414',
        DataProtectionPrivacy: '5f97b677844b872dd039a415',
        Employment: '5f97b67f844b872dd039a416',
        FinancingCapitalMarkets: '5f97b685844b872dd039a417',
        InfrastructureProjectsFinancing: '5f97b68e844b872dd039a418',
        FundFormation: '5f97b698844b872dd039a419',
        FundInvestment: '5fe2f8d2909172b49a049347',
        IP: '5f97b69e844b872dd039a41a',
        IT: '5f97b6a4844b872dd039a41b',
        Litigation: '5f97b6aa844b872dd039a41c',
        Arbitration: '5fe2faee909172b49a049348',
        Restructuring: '5f97b6b1844b872dd039a41d',
        Insolvency: '5fe2fb26909172b49a049349',
        Regulatory: '5f97b6b8844b872dd039a41e',
        Tax: '5f97b6bf844b872dd039a41f',
        Other: '5f97b6c8844b872dd039a420',
    };
    return status;
};

module.exports = {
    getEmailTemplate,
    lsSignupMaxFileUpload,
    rfpMaxFileUpload,
    getLegalServiceStatus,
    getRfpStatus,
    getProposalStatus,
    getSowList,
};