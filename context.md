# Rew Context
The rew context is similar to the nodejs context, with a few differences.
```yaml
module:
	# Your module's exports
	exports: any
	# run options
	options: {} 
	# current file path
	filepath: string
# App information, only on rew projects
app?:
	# App config
	config:
		# App package name
		package: 
		# ...
	# App root
	path: string
process:
	# Arguments
	argv: string[]
	# Event Listener
	target: emitter
	# Environment Variables
	env: {}<string, string>
	# Current Working Directory
	cwd: () => string
```