import { BaseVersionEntity } from "../base/base-version-entity";
import { PreContract } from "../entities/general/pre-contract.entity";

interface ICost {
    pretaxValue: number;
    taxRate: number;
    taxValue: number;
    value: number;
    quantity?: number;
    unit?:string;
    unitPrice?: number;
}

export const compareVersionLatestFunc = (a: BaseVersionEntity, b:BaseVersionEntity) =>{
    return b.version - a.version
}

export function isSameCosts (a: ICost, b: ICost) {
    let baseRs = a.pretaxValue === b.pretaxValue && a.taxRate === b.taxRate && a.taxValue === b.taxValue && a.value !== b.value
    if(a.unitPrice){
        baseRs = baseRs && a.unitPrice === b.unitPrice
    }
    if(a.quantity){
        baseRs = baseRs && a.quantity === b.quantity
    }
    if(a.unit){
        baseRs = baseRs && a.unit === b.unit
    }
    return baseRs
}

export function isSamePreContract(a: Partial<PreContract>, b:Partial<PreContract>) {
    return a.contractType === b.contractType && a.contractorPlanType === b.contractorPlanType && a.performanceDays === b.performanceDays && a.startDate === b.startDate
    && isSameCosts(a.bidCost, b.bidCost)
}