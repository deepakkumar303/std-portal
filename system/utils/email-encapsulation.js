
const replaceDynamicVariables = async(template, dynamicVariables) => {
    let mailTemplate = template;
    dynamicVariables.forEach((val) => {
        mailTemplate = mailTemplate.replace(new RegExp(`{{${val.replace}}}`, 'g'), val.replaceWith);
    });
    return mailTemplate;
};

module.exports = {
    replaceDynamicVariables,
};