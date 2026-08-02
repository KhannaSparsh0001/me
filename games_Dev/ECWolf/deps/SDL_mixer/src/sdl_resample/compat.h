#pragma once
// Selectively back-port features to old SDL
#ifndef _CRT_SECURE_NO_DEPRECATE
#define _CRT_SECURE_NO_DEPRECATE
#endif
#ifndef _CRT_NONSTDC_NO_DEPRECATE
#define _CRT_NONSTDC_NO_DEPRECATE
#endif

#include <SDL.h>
#include <stdlib.h>

#if defined(_MSC_VER) && _MSC_VER < 1700
#define strtoll _strtoi64
#endif


#if !SDL_VERSION_ATLEAST(2,0,0)
// SDL 1.2 support is a bit of a hack since we need to ignore a lot of features

#define SDL_DISABLE_PMMINTRIN_H 1

#include <assert.h>
#include <math.h>
#define SDL_assert assert
#define SDL_CloseAudioDevice(a) SDL_CloseAudio()
#define SDL_LockAudioDevice(a) SDL_LockAudio()
#define SDL_UnlockAudioDevice(a) SDL_UnlockAudio()
#define SDL_PauseAudioDevice(a,b) SDL_PauseAudio((b))
#define SDL_GetHintBoolean(a, b) (b)
#define SDL_MixAudioFormat(a,b,c,d,e) SDL_MixAudio((a),(b),(d),(e))
#define SDL_Log printf
#define SDL_ceil ceil
#define SDL_pow pow
#define SDL_sinf sinf
#define SDL_sqrt sqrt
#define SDL_sin sin

#if defined(_MSC_VER)
	#define SDL_FORCE_INLINE __forceinline
#elif ( (defined(__GNUC__) && (__GNUC__ >= 4)) || defined(__clang__) )
	#define SDL_FORCE_INLINE __attribute__((always_inline)) static inline
#else
	#define SDL_FORCE_INLINE static inline
#endif
#define SDL_INLINE inline

#define SDL_zero(x) SDL_memset(&(x), 0, sizeof((x)))
#define SDL_zerop(x) SDL_memset((x), 0, sizeof(*(x)))

#define SDL_AUDIO_ALLOW_FREQUENCY_CHANGE 0
#define SDL_AUDIO_ALLOW_CHANNELS_CHANGE 0

static int SDL_InvalidParamError(const char *param) {
    SDL_SetError("Invalid parameter: %s", param);
    return -1;
}

static int SDL_OutOfMemoryNew() {
    SDL_OutOfMemory();
    return -1;
}
#undef SDL_OutOfMemory
#define SDL_OutOfMemory SDL_OutOfMemoryNew

static int SDL_AtomicGet(int* value)
{
    return *value;
}
static void SDL_AtomicSet(int* ptr, int value)
{
    *ptr = value;
}

static Sint64 SDL_RWsize(SDL_RWops *context)
{
    int cur, size;

    cur = SDL_RWtell(context);
    SDL_RWseek(context, 0, RW_SEEK_END);
    size = SDL_RWtell(context);
    SDL_RWseek(context, cur, RW_SEEK_SET);
    return size;
}
#endif

#if !SDL_VERSION_ATLEAST(2,0,5)
extern void *Mix_LoadFile_RW(SDL_RWops * src, size_t *datasize, int freesrc);
#define SDL_LoadFile_RW Mix_LoadFile_RW

#if SDL_VERSION_ATLEAST(2,0,0)
static SDL_bool SDL_GetHintBoolean(const char* name, SDL_bool default_value) {
    const char *hint = SDL_GetHint(name);
    if (!hint || !*hint) {
        return default_value;
    }
    if (*hint == '0' || SDL_strcasecmp(hint, "false") == 0) {
        return SDL_FALSE;
    }
    return SDL_TRUE;
}
#endif
#endif

#if !SDL_VERSION_ATLEAST(2,0,7)
#include "SDL_audiocvt.h"

int Mix_ConvertAudio(SDL_AudioCVT * cvt);
int Mix_BuildAudioCVT(SDL_AudioCVT * cvt, SDL_AudioFormat src_fmt, Uint8 src_channels, int src_rate, SDL_AudioFormat dst_fmt, Uint8 dst_channels, int dst_rate);

// Use newer resampler even though this function is nominally available
#define SDL_ConvertAudio Mix_ConvertAudio
#define SDL_BuildAudioCVT Mix_BuildAudioCVT
#endif

#if !SDL_VERSION_ATLEAST(2,0,9)
#define SDL_exp exp
#endif

#ifndef SDL_MIN_SINT16
#define SDL_MIN_SINT16 -0x8000
#endif
#ifndef SDL_MAX_SINT16
#define SDL_MAX_SINT16 0x7FFF
#endif
#ifndef SDL_MAX_UINT64
#define SDL_MAX_UINT64 0xFFFFFFFFFFFFFFFFu
#endif
