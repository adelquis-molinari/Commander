/* eslint-disable space-before-function-paren */
import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

const cleanStdout = (stdout) => stdout.trim().split('\n').filter(Boolean)

// eslint-disable-next-line space-before-function-paren

export async function getChangedFiles() {
  const { stdout } = await execAsync('git status --porcelain')
  return cleanStdout(stdout).map((line) => line.split(' ').at(-1))
}

export async function getStagedFiles() {
  const { stdout } = await execAsync('git diff --cached --name-only')
  return cleanStdout(stdout)
}

export async function gitCommit({ commit } = {}) {
  const { stdout } = await execAsync(`git commit -m "${commit}"`)
  return cleanStdout(stdout)
}

export async function gitAdd({ files = [] } = {}) {
  const filesLine = files.join(' ')
  const { stdout } = await execAsync(`git add ${filesLine}`)
  return cleanStdout(stdout)
}
