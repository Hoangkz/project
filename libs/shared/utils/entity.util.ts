
export function getMetadataFromAttrs(attrs: any) : any{
    if(attrs){
        return Object.keys(attrs).map((metaKey: string) => {
            return {
                metaKey,
                metaValue: String(attrs[metaKey])
            }
        })
    }
    return []
}

export function getAttrsFromMetadata(metadata: any[]){
    const attrs = {}
    if(metadata && metadata.length > 0){
        metadata.forEach(meta => {
            attrs[meta.metaKey] = meta.metaValue === 'true' ? true : meta.metaValue === 'false' ? false : meta.metaValue
        })
    }
    return attrs
}