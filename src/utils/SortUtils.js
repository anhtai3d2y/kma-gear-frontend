export const sortByDateASC = (a, b) => {
    if (a.updatedAt < b.updatedAt) {
        return -1;
    }
    if (a.updatedAt > b.updatedAt) {
        return 1;
    }
    return 0;
}

export const sortByDateDESC = (a, b) => {
    if (a.updatedAt < b.updatedAt) {
        return 1;
    }
    if (a.updatedAt > b.updatedAt) {
        return -1;
    }
    return 0;
}

export const sortByCreateDateASC = (a, b) => {
    if (a.createdAt < b.createdAt) {
        return -1;
    }
    if (a.createdAt > b.createdAt) {
        return 1;
    }
    return 0;
}

export const sortByCreateDateDESC = (a, b) => {
    if (a.createdAt < b.createdAt) {
        return 1;
    }
    if (a.createdAt > b.createdAt) {
        return -1;
    }
    return 0;
}

export const sortByIdASC = (a, b) => {
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
}

export const sortByIdDESC = (a, b) => {
    if (a.id < b.id) {
        return 1;
    }
    if (a.id > b.id) {
        return -1;
    }
    return 0;
}

export const sortByPriceASC = (a, b) => {
    if (a.price < b.price) {
        return -1;
    }
    if (a.price > b.price) {
        return 1;
    }
    return 0;
}

export const sortByPriceDESC = (a, b) => {
    if (a.price < b.price) {
        return 1;
    }
    if (a.price > b.price) {
        return -1;
    }
    return 0;
}

export const sortByAmountASC = (a, b) => {
    if (a.amount < b.amount) {
        return -1;
    }
    if (a.amount > b.amount) {
        return 1;
    }
    return 0;
}

export const sortByAmountDESC = (a, b) => {
    if (a.amount < b.amount) {
        return 1;
    }
    if (a.amount > b.amount) {
        return -1;
    }
    return 0;
}

export const sortByDiscountASC = (a, b) => {
    if (a.discount < b.discount) {
        return -1;
    }
    if (a.discount > b.discount) {
        return 1;
    }
    return 0;
}

export const sortByDiscountDESC = (a, b) => {
    if (a.discount < b.discount) {
        return 1;
    }
    if (a.discount > b.discount) {
        return -1;
    }
    return 0;
}

export const sortByNameASC = (a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

export const sortByNameDESC = (a, b) => {
    if (a.name < b.name) {
        return 1;
    }
    if (a.name > b.name) {
        return -1;
    }
    return 0;
}

export const sortByTypenameASC = (a, b) => {
    if (a.typeName < b.typeName) {
        return -1;
    }
    if (a.typeName > b.typeName) {
        return 1;
    }
    return 0;
}

export const sortByTypenameDESC = (a, b) => {
    if (a.typeName < b.typeName) {
        return 1;
    }
    if (a.typeName > b.typeName) {
        return -1;
    }
    return 0;
}

export const sortByEmailASC = (a, b) => {
    if (a.email < b.email) {
        return -1;
    }
    if (a.email > b.email) {
        return 1;
    }
    return 0;
}

export const sortByEmailDESC = (a, b) => {
    if (a.email < b.email) {
        return 1;
    }
    if (a.email > b.email) {
        return -1;
    }
    return 0;
}

export const sortByFullNameASC = (a, b) => {
    if (a.fullName < b.fullName) {
        return -1;
    }
    if (a.fullName > b.fullName) {
        return 1;
    }
    return 0;
}

export const sortByFullNameDESC = (a, b) => {
    if (a.fullName < b.fullName) {
        return 1;
    }
    if (a.fullName > b.fullName) {
        return -1;
    }
    return 0;
}

export const sortByPhonenumberASC = (a, b) => {
    if (a.phoneNumber < b.phoneNumber) {
        return -1;
    }
    if (a.phoneNumber > b.phoneNumber) {
        return 1;
    }
    return 0;
}

export const sortByPhonenumberDESC = (a, b) => {
    if (a.phoneNumber < b.phoneNumber) {
        return 1;
    }
    if (a.phoneNumber > b.phoneNumber) {
        return -1;
    }
    return 0;
}

export const sortByAddressASC = (a, b) => {
    if (a.address < b.address) {
        return -1;
    }
    if (a.address > b.address) {
        return 1;
    }
    return 0;
}

export const sortByAddressDESC = (a, b) => {
    if (a.address < b.address) {
        return 1;
    }
    if (a.address > b.address) {
        return -1;
    }
    return 0;
}

export const sortByNoteASC = (a, b) => {
    if (a.note < b.note) {
        return -1;
    }
    if (a.note > b.note) {
        return 1;
    }
    return 0;
}

export const sortByNoteDESC = (a, b) => {
    if (a.note < b.note) {
        return 1;
    }
    if (a.note > b.note) {
        return -1;
    }
    return 0;
}
export const sortByTotalDESC = (a, b) => {
    if (a.total < b.total) {
        return 1;
    }
    if (a.total > b.total) {
        return -1;
    }
    return 0;
}
export const sortByTypeASC = (a, b) => {
    if (a.type < b.type) {
        return -1;
    }
    if (a.type > b.type) {
        return 1;
    }
    return 0;
}

export const sortByTypeDESC = (a, b) => {
    if (a.type < b.type) {
        return 1;
    }
    if (a.type > b.type) {
        return -1;
    }
    return 0;
}