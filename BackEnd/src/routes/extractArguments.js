module.exports = (body, args=[{key, type, optional:false}]) => 
{
    const outp = {};
    for (const {key, type, optional} of args) 
    {
        const val = body[key];
        if ( !optional && (val === undefined || typeof val != type) ) 
            throw new Error( formatArgs(args) + ' => ' + key );
        outp[key] = val;
    }
    return outp;
};

const formatArgs = args => 
{
    let outp = 'The following arguments are required: ';
    for (let i = 0; i < args.length; ++i) 
    {
        const {key, type, optional} = args[i];
        outp += `${key}${optional ? '?':''} (${type})`;
        if (i < args.length-1) outp += ', ';
    }
    return outp;
};
