'use server'

export async function getChats(userId?: string | null) {
  return []
}

export async function getChat(id: string, userId: string) {
  return null
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  
}

export async function clearChats() {
}
