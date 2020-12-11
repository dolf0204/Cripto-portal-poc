import {
    classTransformer,
    supportLib,
    graphQLClassTransformers,
    DateTransform,
    Expose,
}
    from "biss-core";

const transformer = classTransformer;
const { Type, Transform, TransformationType } = supportLib.ClassTransformer;
const { VueCreateDecorator: createDecorator } = supportLib;
const { ReflectMetadata, moment } = supportLib;
const { lodash: _ } = supportLib;
const {
    Prop,
    Watch,
    Emit,
    PropSync,
    Ref,
    Vue,
    Component,
    Mixins,
    Model,
    Inject,
    InjectReactive,
    Provide,
    ProvideReactive,
} = supportLib.VuePropertyDecorator;

const {
    Field,
    Mutation,
    Argument,
    queryBuilder,
    mutationBuilder,
    queryBuilderSingleRecord,
    mutationBuilderSingleRecord,
} = graphQLClassTransformers;

export {
    transformer,
    Type,
    DateTransform,
    Expose,
    Transform,
    TransformationType,
    ReflectMetadata,
    Prop,
    Watch,
    Emit,
    Model,
    Inject,
    InjectReactive,
    Provide,
    ProvideReactive,
    Component,
    PropSync,
    Ref,
    createDecorator,
    Vue,
    _,
    Mixins,
    moment,
    Field,
    Mutation,
    Argument,
    queryBuilder,
    mutationBuilder,
    queryBuilderSingleRecord,
    mutationBuilderSingleRecord,
};
