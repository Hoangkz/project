
export function mergeDataToString(template: string, data: any){
    try {
        if(!data || typeof data !== 'object'){
            return template;
        }
        return template.replace(/{(\w+)}/g, (_, m) => {
            return data[m] || m;
        })
    } catch (error) {
        return template
    }
}