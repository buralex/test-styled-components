import React from 'react';
import {Link} from 'react-router-dom';
import * as entityNames from "utils/data/entityNames";

const getLink = (props, content) => <Link {...props}>{content}</Link>;

const getEntityViewUpdateLink = (entityName, entity, action) => {
    if (entityName === entityNames.ENTITY_NAME_COMPANY) {
        const companyType = entity && entity.is_customer ? 'customers' : 'brokers';
        return `/${companyType}/${action}/${entity.id}`;
    } else if (entityName === entityNames.ENTITY_NAME_AGENT) {
        const agentType = entity && entity.is_customer ? 'customer-agents' : 'broker-agents';
        return `/${agentType}/${action}/${entity.id}`;
    } else if (entityName === entityNames.ENTITY_NAME_USER) {
        return `/users/${action}/${entity.id}`;
    } else if (entityName === entityNames.ENTITY_NAME_LOAD) {
        return `/loads/${action}/${entity.id}`;
    } else if (entityName === entityNames.ENTITY_NAME_SHIPPER) {
        return `/shippers/${action}/${entity.id}`;
    } else if (entityName === entityNames.ENTITY_NAME_DRIVER) {
        return `/drivers/${action}/${entity.id}`;
    } else if (entityName === entityNames.ENTITY_NAME_CARRIER) {
        return `/carriers/${action}/${entity.id}`;
    } else if (entityName === entityNames.ENTITY_NAME_TRUCK) {
        return `/trucks/${action}/${entity.number}`;
    }

    return '';
};

const getChatLink = (entityName, entity) => {
    if (entityName === entityNames.ENTITY_NAME_DRIVER) {
        return `/driver/chat/${entity.id}`;
    }

    return '';
};

export const getEntityUpdateLink = (params) => {
    const {
        entityName, entityData, linkContent, linkClassName, onlyString,
    } = params;
    if (onlyString) {
        return getEntityViewUpdateLink(entityName, entityData, 'update');
    }
    return getLink(
        {
            to: getEntityViewUpdateLink(entityName, entityData, 'update'),
            className: linkClassName,
        },
        linkContent,
    );
};

export const getEntityViewLink = (params) => {
    const {
        entityName, entityData, linkContent, linkClassName, onlyString,
    } = params;
    if (onlyString) {
        return getEntityViewUpdateLink(entityName, entityData, 'view');
    }
    return getLink(
        {
            to: getEntityViewUpdateLink(entityName, entityData, 'view'),
            className: linkClassName,
        },
        linkContent,
    );
};

export const getEntityChatLink = (params) => {
    const {
        entityName, entityData, linkContent, linkClassName, onlyString,
    } = params;
    if (onlyString) {
        return getChatLink(entityName, entityData);
    }
    return getLink(
        {
            to: getChatLink(entityName, entityData),
            className: linkClassName,
        },
        linkContent,
    );
};
