import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

export default function useBreakPoints() {
    const {xs, sm, md, lg, xl, xxl} = useBreakpoint()


    return {
        isMobile: xs || (sm && !md),
        isXsSize: xs,
        isSmSize: sm,
        isMdSize: md,
        isLgSize: lg,
        isXlSize: xl,
        isXxlSize: xxl,

    }
}