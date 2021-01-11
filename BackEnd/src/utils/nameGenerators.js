exports.generateCourseName = (subjectName='', courseYear=0) =>  
{
    if (!validateArgs([
        {value: subjectName, type: 'string'},
        {value: courseYear, type: 'number'},
        ])) throw new Error('subjectName must be of type String and courseYear must be of type Number');
    
    return `${subjectName}-${courseYear}`;
};

const validateArgs = (args=[{value, type}]) =>  
{
    for (const arg of args) 
    {
        if (typeof arg.value != arg.type) return false;
    }
    return true;
};
