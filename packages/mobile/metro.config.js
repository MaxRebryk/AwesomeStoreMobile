const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer = {
	...config.transformer,
	babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver.assetExts = config.resolver.assetExts.filter(
	(ext) => ext !== 'svg',
);
config.resolver.sourceExts.push('svg');

// Відключаємо Hermes
config.transformer.unstable_allowRequireContext = false;
config.transformer.allowOptionalDependencies = false;

module.exports = {
	...config,
	resolver: {
		...config.resolver,
		sourceExts: [...config.resolver.sourceExts, 'mjs', 'cjs'],
	},
};
